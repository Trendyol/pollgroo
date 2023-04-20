import React, { ReactNode } from 'react';
import { Navigation, SubNavigation } from '../../organisms';

interface IProps {
  logoUrl: string;
  subNavigationText: string;
  children: ReactNode;
}

export const NavigationLayout = ({ logoUrl, subNavigationText, children }: IProps) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Navigation logoUrl={logoUrl} />
      </div>

      <main className="w-full">
        <SubNavigation subNavigationText={subNavigationText} />
        {children}
      </main>
    </div>
  );
};
