import React, { ReactNode } from 'react';
import { useApp } from 'contexts';
import { Navigation, SubNavigation } from '../../organisms';
import { Toaster, ToasterVariant } from '../../molecules';

interface IProps {
  logoUrl: string;
  subNavigationText: string;
  children: ReactNode;
  iconOnlyLogo: string;
}

export const NavigationLayout = ({ logoUrl, subNavigationText, children, iconOnlyLogo }: IProps) => {
  const { toasterContent, setToasterContent } = useApp();

  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Navigation logoUrl={logoUrl} iconOnlyLogo={iconOnlyLogo} />
      </div>

      <main className="w-full">
        <>
          <SubNavigation subNavigationText={subNavigationText} />
          {children}
        </>
      </main>
      {toasterContent && (
        <Toaster
          show={toasterContent.show}
          variant={toasterContent.variant as keyof typeof ToasterVariant}
          text={toasterContent.text}
          onClose={() => setToasterContent(undefined)}
          className="fixed top-8 right-8" />
      )}
    </div>
  );
};
