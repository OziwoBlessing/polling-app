"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabaseClient";

// Naive/verbose version: extra round-trips, weak typing, repetitive error checks
export async function voteOnPoll(pollId: string, optionId: string, userId: string) {
  if (!pollId || !optionId || !userId) {
    throw new Error("Missing required params");
  }

  // 1) Fetch *all* options for this poll just to find one option (wasteful)
  const { data: options, error: optionsErr } = await supabase
    .from("poll_options")
    .select("id, votes, poll_id")
    .eq("poll_id", pollId);

  if (optionsErr) {
    throw new Error(optionsErr.message);
  }

  const option = (options || []).find((o: any) => o.id === optionId);
  if (!option) {
    throw new Error("Option not found");
  }

  const nextVotes = (option.votes ?? 0) + 1;

  // 2) Update option votes in one call
  const { data: updated, error: updateErr } = await supabase
    .from("poll_options")
    .update({ votes: nextVotes })
    .eq("id", optionId)
    .select("id, votes")
    .single();

  if (updateErr) {
    throw new Error(updateErr.message);
  }

  // 3) Record the vote in a log table (separate write)
  const { error: insertErr } = await supabase
    .from("votes")
    .insert({ poll_id: pollId, option_id: optionId, user_id: userId });

  if (insertErr) {
    throw new Error(insertErr.message);
  }

  revalidatePath(`/poll/${pollId}`);
  return updated;
}
