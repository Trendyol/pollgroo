import React from 'react';
import { NavigationLayout } from '../../layouts';
import { useGrooming } from 'contexts';
import {
  GroomingTasks,
  GroomingWaitingInfo,
  AddTaskToGroomingModal,
  EditGroomingTaskModal,
  StickyGroomingBottomBox,
} from '../../organisms';

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const { groomingData } = useGrooming();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="pt-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <GroomingWaitingInfo />
        <GroomingTasks />
      </div>
      <AddTaskToGroomingModal />
      <EditGroomingTaskModal />
      <StickyGroomingBottomBox />
    </NavigationLayout>
  );
};
