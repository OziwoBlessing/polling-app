"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabaseClient";

// Define types for better type safety
type PollOption = {
  id: string;
  votes: number;
  poll_id: string;
};

type VoteResult = {
  id: string;
  votes: number;
};

/**
 * Records a vote for a specific poll option and updates the vote count
 * @param pollId - The ID of the poll being voted on
 * @param optionId - The ID of the selected option
 * @param userId - The ID of the user casting the vote
 * @returns The updated poll option with new vote count
 */
export async function voteOnPoll(pollId: string, optionId: string, userId: string): Promise<VoteResult> {
  // Early validation with specific error messages
  if (!pollId) throw new Error("Poll ID is required");
  if (!optionId) throw new Error("Option ID is required");
  if (!userId) throw new Error("User ID is required");

  try {
    // 1) Fetch only the specific option we need (instead of all options)
    const { data: option, error: optionErr } = await supabase
      .from("poll_options")
      .select("id, votes")
      .eq("id", optionId)
      .eq("poll_id", pollId) // Ensure the option belongs to the correct poll
      .single();

    if (optionErr) {
      throw new Error(`Failed to fetch poll option: ${optionErr.message}`);
    }

    if (!option) {
      throw new Error(`Option with ID ${optionId} not found in poll ${pollId}`);
    }

    // Calculate the new vote count
    const nextVotes = (option.votes ?? 0) + 1;

    // 2) Run the update and insert operations in parallel for better performance
    const [updateResult, insertResult] = await Promise.all([
      // Update the option's vote count
      supabase
        .from("poll_options")
        .update({ votes: nextVotes })
        .eq("id", optionId)
        .select("id, votes")
        .single(),
      
      // Record the vote in the votes table
      supabase
        .from("votes")
        .insert({ poll_id: pollId, option_id: optionId, user_id: userId })
    ]);

    // Check for errors in the update operation
    if (updateResult.error) {
      throw new Error(`Failed to update vote count: ${updateResult.error.message}`);
    }

    // Check for errors in the insert operation
    if (insertResult.error) {
      throw new Error(`Failed to record vote: ${insertResult.error.message}`);
    }

    // Revalidate the poll page to reflect the updated vote count
    revalidatePath(`/polls/${pollId}`);

    
    return updateResult.data as VoteResult;
  } catch (error) {
    // Catch and rethrow with more context if it's not already an Error object
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`An unexpected error occurred while voting: ${String(error)}`);
  }
}
