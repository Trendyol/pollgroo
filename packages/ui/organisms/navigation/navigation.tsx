import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from '../../atoms';
import { NAVIGATION_ITEMS } from './constants';
import classNames from 'classnames';
import { IconX, IconMenu2 } from '@tabler/icons-react';

export interface IProps {
  logoUrl: string;
}

export const Navigation = ({ logoUrl }: IProps) => {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const { pathname } = router;

  const navClass = classNames('fixed w-full', { 'h-screen': show }, 'lg:h-screen lg:w-72');
  const navBrandClass = classNames(
    'fixed z-50 w-full flex bg-lightblue border-lightgray justify-between items-center px-5 py-4',
    'lg:items-center lg:justify-center lg:relative lg:border-none',
    { 'border-b': !show }
  );
  const navListClass = classNames(
    { 'translate-y-0': show, '-translate-y-full': !show },
    'fixed z-40 top-0 flex flex-col justify-center w-full h-screen bg-lightblue gap-y-10 transition-all duration-500',
    'lg:flex lg:px-4 lg:gap-0 lg:py-16 lg:relative lg:translate-y-0 lg:justify-start'
  );
  const navElementClass = 'text-center text-darkgray py-4 hover:lg:bg-blue lg:rounded-lg lg:cursor-pointer';

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <nav className={navClass}>
      <div className={navBrandClass}>
        <Image priority className="h-auto w-30" src={logoUrl} alt="Pollgroo" width={125} height={100} />
        <IconMenu2 data-testid="menu-icon" className={classNames('lg:hidden', { hidden: show })} onClick={toggleMenu} />
        <IconX
          data-testid="menu-close-icon"
          className={classNames('lg:hidden', { hidden: !show })}
          onClick={toggleMenu}
        />
      </div>
      <ul className={navListClass}>
        {NAVIGATION_ITEMS.map((item) => (
          <li
            className={classNames(navElementClass, {
              'lg:bg-blue lg:text-primary lg:font-bold active': pathname === item.href,
            })}
            key={item.id}
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};