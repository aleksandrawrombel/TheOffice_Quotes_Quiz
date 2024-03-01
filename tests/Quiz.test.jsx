import { it, expect, describe } from 'vitest';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Quiz from '../src/components/Quiz';

describe('Quiz elements display', () => {
  it('should display Score, Timer and Quote', async () => {
    const { getByText, getByTestId } = render(<Quiz time={29} name="User" />);

    await waitFor(() => {
      expect(getByText(/Score:/)).toBeInTheDocument();
      expect(getByText(/Timer:/)).toBeInTheDocument();
      expect(getByTestId('quote')).toBeInTheDocument();
    });
  });
});
