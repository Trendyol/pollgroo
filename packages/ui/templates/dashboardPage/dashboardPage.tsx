import React from 'react';
import { NavigationLayout } from '../../layouts';

export const DashboardPage = ({ logoUrl }: any) => {
  return (
    <NavigationLayout logoUrl={logoUrl} subNavigationText="Dashboard">
      my dashboard
    </NavigationLayout>
  );
};
