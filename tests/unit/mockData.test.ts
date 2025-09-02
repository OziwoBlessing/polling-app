import { describe, it, expect } from 'vitest';
import { getPollById, polls } from '@/lib/mockData';

describe('getPollById', () => {
  it('should return the correct poll when given a valid ID', () => {
    // Arrange
    const validId = '1';
    const expectedPoll = polls.find(poll => poll.id === validId);
    
    // Act
    const result = getPollById(validId);
    
    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(expectedPoll);
    expect(result?.id).toBe(validId);
    expect(result?.question).toBe('What is your favorite programming language?');
    expect(result?.options.length).toBe(5);
  });
  
  it('should return undefined when given an invalid ID', () => {
    // Arrange
    const invalidId = 'non-existent-id';
    
    // Act
    const result = getPollById(invalidId);
    
    // Assert
    expect(result).toBeUndefined();
  });
});