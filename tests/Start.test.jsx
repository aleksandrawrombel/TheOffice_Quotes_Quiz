import { it, expect, describe } from 'vitest';
import React from 'react';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import Start from '../src/components/Start';
import Leaderboard from '../src/components/Leaderboard';

describe('Start to Leaderboard', () => {
  it('should pass the name from Start to Leaderboard', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Start />);
    const nameInput = getByPlaceholderText('Enter your name');
    const testName = "Ola";
    fireEvent.change(nameInput, { target: { value: testName } });
    fireEvent.submit(getByTestId('startForm'));

    const leaderboardComponent = render(<Leaderboard name={testName} />);
    const leaderboardName = leaderboardComponent.getByTestId('name');
    expect(leaderboardName).toBeInTheDocument();
  });
});
