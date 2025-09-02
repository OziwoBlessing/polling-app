import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteForm from '@/components/polls/VoteForm';
import { getValidPollId } from '../helpers/pollHelpers';
import { polls } from '@/lib/mockData';

describe('Vote Poll Integration Test', () => {
  const validPollId = getValidPollId();
  const validPoll = polls.find(poll => poll.id === validPollId);
  const options = validPoll?.options || [];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should render the vote form with all options', () => {
    // Arrange & Act
    render(<VoteForm pollId={validPollId} options={options} />);
    
    // Assert
    options.forEach(option => {
      // Check for the option text in the document instead of using getByLabelText
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
    
    const submitButton = screen.getByRole('button', { name: /vote/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled(); // Button should be disabled initially
  });
  
  it('should enable the vote button when an option is selected', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<VoteForm pollId={validPollId} options={options} />);
    
    // Act
    // Get the first radio input directly
    const firstOption = screen.getAllByRole('radio')[0];
    await user.click(firstOption);
    
    // Assert
    const submitButton = screen.getByRole('button', { name: /vote/i });
    expect(submitButton).not.toBeDisabled();
  });
  
  it('should show success message after successful vote submission', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<VoteForm pollId={validPollId} options={options} />);
    
    // Act
    // Get the first radio input directly
    const firstOption = screen.getAllByRole('radio')[0];
    await user.click(firstOption);
    
    const submitButton = screen.getByRole('button', { name: /vote/i });
    await user.click(submitButton);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText(/thank you for voting/i)).toBeInTheDocument();
    });
  });
});