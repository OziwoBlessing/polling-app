import { Metadata } from 'next';
import NavBar from '@/components/navigation/NavBar';

export const metadata: Metadata = {
  title: 'Polls | Polling App',
  description: 'Manage your polls',
};

export default function PollsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Polling App</h2>
          <NavBar />
        </div>
      </header>
      
      <main>{children}</main>
    </div>
  );
}