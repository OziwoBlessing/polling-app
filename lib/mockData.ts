// Mock data for polls

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: string;
  createdBy: string;
  votes: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export const polls: Poll[] = [
  {
    id: '1',
    question: 'What is your favorite programming language?',
    options: [
      { id: '1a', text: 'JavaScript', votes: 42 },
      { id: '1b', text: 'Python', votes: 35 },
      { id: '1c', text: 'TypeScript', votes: 28 },
      { id: '1d', text: 'Java', votes: 20 },
      { id: '1e', text: 'C#', votes: 18 },
    ],
    createdAt: '2023-05-15T10:30:00Z',
    createdBy: 'user123@example.com',
    votes: 143
  },
  {
    id: '2',
    question: 'Which frontend framework do you prefer?',
    options: [
      { id: '2a', text: 'React', votes: 55 },
      { id: '2b', text: 'Vue', votes: 30 },
      { id: '2c', text: 'Angular', votes: 25 },
      { id: '2d', text: 'Svelte', votes: 15 },
    ],
    createdAt: '2023-05-16T14:20:00Z',
    createdBy: 'dev456@example.com',
    votes: 125
  },
  {
    id: '3',
    question: 'What is your preferred deployment platform?',
    options: [
      { id: '3a', text: 'Vercel', votes: 38 },
      { id: '3b', text: 'Netlify', votes: 32 },
      { id: '3c', text: 'AWS', votes: 40 },
      { id: '3d', text: 'Google Cloud', votes: 25 },
      { id: '3e', text: 'Azure', votes: 20 },
    ],
    createdAt: '2023-05-17T09:15:00Z',
    createdBy: 'admin789@example.com',
    votes: 155
  },
];

export function getPollById(id: string): Poll | undefined {
  return polls.find(poll => poll.id === id);
}