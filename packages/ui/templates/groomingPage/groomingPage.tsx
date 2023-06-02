import React from 'react';
import { NavigationLayout } from '../../layouts';
import { useApp, useGrooming } from 'contexts';
import {
  GroomingTasks,
  GroomingWaitingInfo,
  AddTaskToGroomingModal,
  EditGroomingTaskModal,
  StickyGroomingBottomBox,
  GroomingForm,
} from '../../organisms';
import { Loader } from '../../molecules';
import { SelectGroomingTasks } from '../../organisms/selectGroomingTasks';

export interface IProps {
  logoUrl: string;
}

export const GroomingPage = ({ logoUrl }: IProps) => {
  const { groomingData } = useGrooming();
  const { showLoader } = useApp();

  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText={groomingData.title}>
      <div className="pt-5 px-5 flex flex-col gap-y-5 lg:pt-10 lg:gap-y-10 lg:px-20">
        <SelectGroomingTasks />
        <GroomingWaitingInfo />
        <GroomingTasks />
        <GroomingForm />
      </div>
      <AddTaskToGroomingModal />
      <EditGroomingTaskModal />
      <StickyGroomingBottomBox />
      <Loader active={showLoader} />
    </NavigationLayout>
  );
};
