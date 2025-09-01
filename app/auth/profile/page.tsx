import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
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
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{session.user.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-mono text-sm">{session.user.id}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Last Sign In</p>
            <p>{new Date(session.user.last_sign_in_at || '').toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}