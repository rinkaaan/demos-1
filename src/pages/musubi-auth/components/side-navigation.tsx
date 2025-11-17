import React from 'react';

import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

import { Navigation as CommonNavigation } from '../../commons';
import { useRouter } from '../router';

const navItems: SideNavigationProps['items'] = [
  { type: 'link', text: 'Dashboard', href: '#/' },
  {
    text: 'Todos',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Todos', href: '#/manage_todos' },
      { type: 'link', text: 'Projects', href: '#/manage_projects' },
    ],
  },
  {
    text: 'Browser time',
    type: 'section',
    defaultExpanded: true,
    items: [
      { type: 'link', text: 'Browser time', href: '#/browser_time' },
      { type: 'link', text: 'Browser history', href: '#/browser_history' },
      { type: 'link', text: 'Bookmarks', href: '#/bookmarks' },
    ],
  },
  { type: 'divider' },
  {
    type: 'link',
    href: '#/settings',
    text: 'Settings',
  },
];

export function MusubiAuthSideNavigation() {
  const { currentPath } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onFollowHandler: SideNavigationProps['onFollow'] = () => {
    // We need to pass a handler to override the default onFollow handler, which prevents navigation.
  };

  return (
    <CommonNavigation
      header={{ text: 'Musubi Auth', href: '#/musubi-auth' }}
      items={navItems}
      activeHref={currentPath ? `#${currentPath}` : '#/'}
      onFollowHandler={onFollowHandler}
    />
  );
}
