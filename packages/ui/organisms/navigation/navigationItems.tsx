import {
  IconLayoutDashboard,
  IconPlayerTrackNextFilled,
  IconUsersGroup,
  IconDeviceGamepad2,
  IconReport,
  IconLogout2,
  IconPlayerTrackPrevFilled
} from '@tabler/icons-react';

export const NAVIGATION_ITEMS = [
  {
    id: 0,
    href: '/dashboard',
    text: 'Dashboard',
    icon: <IconLayoutDashboard />,
  },
  {
    id: 2,
    href: '/myTeams',
    text: 'My Teams',
    icon: <IconUsersGroup />,
  },
  {
    id: 3,
    href: '/games',
    text: 'Games',
    icon: <IconDeviceGamepad2 />,
  },
  {
    id: 4,
    href: '/gameResults',
    text: 'Game Results',
    icon: <IconReport />,
  },
];

export const NAVIGATION_SETTINGS_ITEMS = [
  {
    id: 1,
    href: '#',
    defaultText: 'Expand Sidebar',
    secondaryText: 'Collapse Sidebar',
    icon: <IconPlayerTrackNextFilled />,
    secondaryIcon: <IconPlayerTrackPrevFilled />,
    webOnly: false,
    key: 'EXPAND_COLLAPSE_BUTTON'
  },
  {
    id: 2,
    href: '#',
    defaultText: 'Logout',
    secondaryText: "",
    icon: <IconLogout2 />,
    secondaryIcon: <IconLogout2 />,
    webOnly: true,
    key: 'LOGOUT'
  },
];
