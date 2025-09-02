import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getValidPollId, getInvalidPollId } from '../helpers/pollHelpers';
import { getPollById } from '@/lib/mockData';

// Mock Next.js navigation functions
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

// Mock Supabase authentication
vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: {
          session: { user: { id: 'test-user-id', email: 'test@example.com' } }
        }
      })
    }
  }))
}));

// Mock cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn().mockReturnValue({ value: 'test-cookie' })
  }))
}));

describe('Poll Page Status Code Test', () => {
  const validId = getValidPollId();
  const invalidId = getInvalidPollId();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should return a valid poll when given a valid ID', async () => {
    // Arrange & Act
    const result = getPollById(validId);
    
    // Assert
    expect(result).toBeDefined();
    expect(result?.id).toBe(validId);
  });
  
  it('should return undefined when given an invalid ID', async () => {
    // Arrange & Act
    const result = getPollById(invalidId);
    
    // Assert
    expect(result).toBeUndefined();
  });
});