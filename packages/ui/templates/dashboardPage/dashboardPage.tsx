import React from 'react';
import { Navigation } from '../../organisms';

export const DashboardPage = ({ logoUrl }: any) => {
  return (
    <div>
      <header>
        <Navigation logoUrl={logoUrl}/>
      </header>
      <main className="py-16 lg:pl-72 lg:py-0">Dashboard</main>
    </div>
  );
};
