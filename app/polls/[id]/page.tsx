import { getPollById } from '@/lib/mockData';
import { notFound, redirect } from 'next/navigation';
import VoteForm from '@/components/polls/VoteForm';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface PollPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function PollPage({ params }: PollPageProps) {
  const cookieStore = cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value;
        },
      },
    }
  );
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }
  
  const { id } = params;
  const poll = getPollById(id);
  
  if (!poll) {
    notFound();
  }
  
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-black">{poll.question}</h1>
        
        <div className="text-sm text-gray-500 mb-6">
          <p>Created on {new Date(poll.createdAt).toLocaleDateString()}</p>
          <p>by {poll.createdBy}</p>
        </div>
        
        <VoteForm pollId={poll.id} options={poll.options} />
      </div>
    </div>
  );
}