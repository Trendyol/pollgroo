import React from 'react';
import { LoaderIcon } from './loaderIcon';

interface IProps {
  active: boolean;
}

export const Loader = ({ active }: IProps) => {
  if (!active) {
    return null;
  }
  return (
    <div data-testid="loader-overlay" className="fixed inset-0 bg-lightgray/40 z-[90] flex items-center justify-center">
      <LoaderIcon className="" />
    </div>
  );
};
