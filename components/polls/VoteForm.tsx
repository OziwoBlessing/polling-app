'use client';

import { useState } from 'react';
import { PollOption } from '@/lib/mockData';

interface VoteFormProps {
  pollId: string;
  options: PollOption[];
}

export default function VoteForm({ pollId, options }: VoteFormProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      setMessage({ text: 'Please select an option', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      // In a real app, this would be an API call to record the vote
      // For now, we'll just simulate a successful vote with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ text: 'Vote recorded successfully!', type: 'success' });
      setIsVoteSubmitted(true);
      // In a real app, we might refresh the poll data here
    } catch (error) {
      setMessage({ text: 'Failed to record vote. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVoteSubmitted) {
    return (
      <div className="mt-6 p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-green-700 mb-2">Thank you for voting!</h3>
        <p className="text-green-600">Your vote has been recorded.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleVote} className="space-y-4">
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={option.id}
                name="vote"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mr-2 h-4 w-4"
                disabled={isSubmitting}
              />
              <label htmlFor={option.id} className="flex justify-between w-full">
                <span>{option.text}</span>
                <span className="text-gray-500">{option.votes} votes</span>
              </label>
            </div>
          ))}
        </div>
        
        {message && (
          <div className={`p-2 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !selectedOption}
          className={`w-full py-2 px-4 rounded font-medium ${isSubmitting || !selectedOption ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
        >
          {isSubmitting ? 'Submitting...' : 'Vote'}
        </button>
      </form>
    </div>
  );
}