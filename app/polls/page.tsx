import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Polling App',
  description: 'Your polling dashboard',
};

export default function PollsDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Polls Dashboard</h1>
      
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-lg mb-4">Welcome to your polling dashboard!</p>
        <p>This is where you'll see your polls and create new ones.</p>
      </div>
    </div>
  );
}