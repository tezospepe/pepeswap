import { KeyboardEvent } from 'react';

export const handleSwapKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === '-') {
    event.preventDefault();
  }

  if (event.currentTarget.value.length >= event.currentTarget.maxLength) {
    event.preventDefault();
    event.currentTarget.value = event.currentTarget.value.slice(0, 14);
  }
};
