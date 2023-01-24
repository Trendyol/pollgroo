import * as React from 'react';

export interface ButtonProps {
  text?: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="text-3xl" onClick={() => onClick()}>
      {text || 'Simple Button'}
    </button>
  );
};
