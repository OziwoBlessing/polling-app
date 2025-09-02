import { polls } from '@/lib/mockData';

/**
 * Helper function to check if a poll ID is valid
 * @param id The poll ID to check
 * @returns boolean indicating if the ID is valid
 */
export function isValidPollId(id: string): boolean {
  return polls.some(poll => poll.id === id);
}

/**
 * Helper function to get a valid poll ID for testing
 * @returns A valid poll ID from the mock data
 */
export function getValidPollId(): string {
  return polls[0].id;
}

/**
 * Helper function to get an invalid poll ID for testing
 * @returns An invalid poll ID
 */
export function getInvalidPollId(): string {
  return 'invalid-poll-id-that-does-not-exist';
}