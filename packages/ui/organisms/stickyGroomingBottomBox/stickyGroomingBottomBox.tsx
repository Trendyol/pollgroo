import React from 'react';
import { Button } from '../../atoms';
import translate from 'translations';
import { ProfileCirclesBox } from '../profileCirclesBox';
import { useGrooming } from 'contexts';

export const StickyGroomingBottomBox = () => {
  const { participants } = useGrooming();

  return (
    <>
      <div className="fixed bottom-0 bg-white w-full shadow-2xl lg:pr-72 z-10">
        <div className="p-7 h-20 flex justify-between items-center lg:justify-end lg:gap-x-5">
          <ProfileCirclesBox badgeMembers={participants} totalMembersNumber={participants.length} />
          <Button variant="primary" className="px-10 py-3">
            {translate('START')}
          </Button>
        </div>
      </div>
      <div className="h-20 mt-5"></div>
    </>
  );
};
