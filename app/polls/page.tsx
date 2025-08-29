import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { polls, getPollById } from '@/lib/mockData';

export default async function PollsPage() {
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
  
  const pollsList = polls;
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Polls</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {pollsList.map((poll) => (
          <Link 
            href={`/polls/${poll.id}`} 
            key={poll.id}
            className="block bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
            <p className="text-gray-500 mb-4">{poll.options.length} options</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{poll.votes} votes</span>
              <span className="text-blue-600 text-sm font-medium">Vote now →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}