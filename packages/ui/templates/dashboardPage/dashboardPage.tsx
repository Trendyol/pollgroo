import React from 'react';
import { Navigation, SubNavigation } from '../../organisms';

export const DashboardPage = ({ logoUrl }: any) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Navigation logoUrl={logoUrl} />
      </div>

      <main className="w-full">
        <SubNavigation subNavigationText="Dashboard" />
      </main>
    </div>
  );
};
