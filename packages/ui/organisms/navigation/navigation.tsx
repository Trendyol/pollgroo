import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link, Typography } from '../../atoms';
import { NAVIGATION_ITEMS, NAVIGATION_SETTINGS_ITEMS } from './navigationItems';
import classNames from 'classnames';
import { IconX, IconMenu2 } from '@tabler/icons-react';
import { useMobileDetect } from 'hooks';
import { useApp } from 'contexts';
import { signOut } from 'next-auth/react';

export interface IProps {
  logoUrl: string;
  iconOnlyLogo: string;
}

export const Navigation = ({ logoUrl, iconOnlyLogo }: IProps) => {
  const [show, setShow] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(true);
  const { isReducedNavbar, setIsReducedNavbar } = useApp();
  const { isMobile } = useMobileDetect();
  const router = useRouter();
  const { pathname } = router;
  const reducedNavbarMode = !isMobile && isReducedNavbar;

  const navClass = classNames('fixed z-[60] w-full', { 'h-screen': show }, 'lg:h-screen lg:w-72', {
    'lg:w-24': isReducedNavbar,
  });
  const navBrandClass = classNames(
    'fixed z-50 w-full flex bg-lightblue border-lightgray justify-between items-center px-5 py-4 lg:py-8',
    'lg:items-center lg:justify-center lg:relative lg:border-none',
    { 'border-b': !show }
  );
  const navListClass = classNames(
    { 'translate-y-0': show, '-translate-y-full lg:translate-y-0': !show },
    'fixed z-40 top-0 flex flex-col mt-16 lg:mt-0 w-full h-screen bg-lightblue gap-y-4 lg:gap-y-10 transition-all duration-500 lg:transition-none lg:duration-0',
    'lg:flex lg:px-4 lg:gap-0 lg:py-16 lg:relative lg:translate-y-0 lg:justify-start'
  );
  const navElementClass = classNames('text-center text-darkgray lg:rounded-lg lg:cursor-pointer', {
    'hover:lg:bg-blue': !reducedNavbarMode,
    'hover:lg:text-primary': reducedNavbarMode,
  });
  const navLinkElementClass = classNames('w-full h-full block py-4 group relative', {
    'lg:flex lg:items-center lg:justify-center': reducedNavbarMode,
  });
  const navSettingsClass = classNames(
    'w-full fixed z-50 bottom-8 px-4 lg:w-72',
    { 'lg:w-24': isReducedNavbar, hidden: !show },
    'lg:block'
  );

  const toggleMenu = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('navbarExpandable') === 'false') {
      setIsReducedNavbar(false);
    }
    setFirstRender(false);
  }, [setIsReducedNavbar]);

  const getLinkContext = (item: { id: number; text: string; icon: JSX.Element; href: string }) => {
    if (reducedNavbarMode) {
      return (
        <>
          <div className="">{item.icon}</div>
          <div className="absolute hidden group-hover:flex inset-0 m-auto bg-lightgray left-14 w-max px-2 h-7 z-20 rounded-lg items-center justify-center">
            <Typography element="p" size="xxs" color="darkgray">
              {item.text}
            </Typography>
          </div>
          <div className="absolute hidden group-hover:flex inset-0 m-auto bg-lightgray rotate-45 left-14 w-4 h-4 z-10" />
        </>
      );
    }
    return (
      <div className="flex items-center px-6 lg:justify-start">
        {item.icon}
        <span className="ml-3">{item.text}</span>
      </div>
    );
  };

  const getSettingsLinkContext = (item: {
    id: number;
    defaultText: string;
    icon: JSX.Element;
    href: string;
    key: string;
    secondaryText: string;
    secondaryIcon: JSX.Element;
  }) => {
    let text = item.defaultText;
    let icon = item.icon;
    if (reducedNavbarMode) {
      return (
        <>
          <div className="">{item.icon}</div>
          <div className="absolute hidden group-hover:flex inset-0 m-auto bg-lightgray left-14 w-max px-2 h-7 z-20 rounded-lg items-center justify-center">
            <Typography element="p" size="xxs" color="darkgray">
              {text}
            </Typography>
          </div>
          <div className="absolute hidden group-hover:flex inset-0 m-auto bg-lightgray rotate-45 left-14 w-4 h-4 z-10" />
        </>
      );
    }
    text = item.key === 'EXPAND_COLLAPSE_BUTTON' ? item.secondaryText : item.defaultText;
    icon = item.key === 'EXPAND_COLLAPSE_BUTTON' ? item.secondaryIcon : item.icon;
    return (
      <div className="flex items-center px-3 lg:px-6 lg:justify-start">
        {icon}
        <span className="ml-3">{text}</span>
      </div>
    );
  };

  const handleSettingsItemClick = (key: string) => {
    if (key === 'EXPAND_COLLAPSE_BUTTON') {
      setIsReducedNavbar(!isReducedNavbar);
      localStorage.setItem('navbarExpandable', JSON.stringify(!isReducedNavbar));
    }
    if (key === 'LOGOUT') {
      signOut({ callbackUrl: '/login' })
    }
  };

  return (
    <>
      {!firstRender && (
        <nav className={navClass}>
          <div className={navBrandClass}>
            <div className="relative w-32 h-8">
              <Image priority src={reducedNavbarMode ? iconOnlyLogo : logoUrl} alt="Pollgroo" fill />
            </div>
            <IconMenu2
              data-testid="menu-icon"
              className={classNames('lg:hidden', { hidden: show })}
              onClick={toggleMenu}
            />
            <IconX
              data-testid="menu-close-icon"
              className={classNames('lg:hidden', { hidden: !show })}
              onClick={toggleMenu}
            />
          </div>
          <div>
            <ul className={navListClass}>
              {NAVIGATION_ITEMS.map((item) => (
                <li
                  className={classNames(
                    navElementClass,
                    {
                      ' lg:text-primary lg:font-bold active': pathname === item.href,
                    },
                    { 'lg:bg-blue': !reducedNavbarMode && pathname === item.href }
                  )}
                  key={item.id}
                >
                  <Link href={item.href} className={navLinkElementClass}>
                    {getLinkContext(item)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={navSettingsClass}>
              {NAVIGATION_SETTINGS_ITEMS.map((item) => (
                <li
                  className={classNames(
                    navElementClass,
                    {
                      ' lg:text-primary lg:font-bold active': pathname === item.href,
                    },
                    { 'lg:bg-blue': !reducedNavbarMode && pathname === item.href }
                  )}
                  key={item.id}
                >
                  <Link
                    href={item.href}
                    className={navLinkElementClass}
                    onClick={() => handleSettingsItemClick(item.key)}
                  >
                    {getSettingsLinkContext(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
      <div className={classNames('h-16 w-full lg:h-screen lg:w-72', { 'lg:w-24': reducedNavbarMode })}></div>
    </>
  );
};
