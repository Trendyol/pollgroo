import React from 'react';
import { NavigationLayout } from '../../layouts';
import { GroomingResultData } from '../../interfaces';
import { IconFileCheck } from '@tabler/icons-react';
import { Typography } from '../../atoms';
import translate from 'translations';
import { GameResultCard } from '../../organisms';

export interface IProps {
  logoUrl: string;
  groomingDetail: GroomingResultData;
}

export const GroomingResultPage = ({ logoUrl, groomingDetail }: IProps) => {
  const renderPageContents = () => {
    if (!Object.keys(groomingDetail).length) {
      return null;
    }
    return (
      <div className="py-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <div className="bg-backgroundprimary rounded-full w-14 h-14 flex items-center justify-center">
            <IconFileCheck className="text-primary w-8 h-8 lg:w-10 lg:h-10" />
          </div>
          <Typography element="h4" size="lg" weight="bold" color="black">
            {translate('GROOMING_COMPLETED')}
          </Typography>
          <Typography element="p" size="xs" weight="regular" color="gray">
            {translate('GROOMING_COMPLETED_DESCRIPTION').replace('{0}', groomingDetail.title)}
          </Typography>
          <div className='grid lg:grid-cols-2 w-full gap-6 mt-10'>
            {groomingDetail.tasks.map((task, index) => (
              <GameResultCard
              key={task.detail._id}
                text={task.detail.title}
                order={index + 1}
                total={groomingDetail.tasks.length}
                score={task.detail.score}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingDetail?.title || 'loading..'}>
      {renderPageContents()}
    </NavigationLayout>
  );
};
