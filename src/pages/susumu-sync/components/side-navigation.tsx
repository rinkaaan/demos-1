// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

import { Navigation as CommonNavigation } from '../../commons';
import { useRouter } from '../router';
import { DensityPreferencesDialog } from './density-preferences';

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
    href: '#/density_settings',
    text: 'Density settings',
  },
  {
    type: 'link',
    href: '#/settings',
    text: 'Settings',
  },
];

export function SusumuSyncSideNavigation() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const { currentPath } = useRouter();

  const onFollowHandler: SideNavigationProps['onFollow'] = event => {
    if (event.detail.href === '#/density_settings') {
      event.preventDefault();
      setDialogVisible(true);
    }
    // Let other navigation happen naturally via hash change
  };

  return (
    <>
      <CommonNavigation
        header={{ text: 'Susumu Sync', href: '#/susumu-sync' }}
        items={navItems}
        activeHref={currentPath ? `#${currentPath}` : '#/'}
        onFollowHandler={onFollowHandler}
      />
      {dialogVisible && <DensityPreferencesDialog onDismiss={() => setDialogVisible(false)} />}
    </>
  );
}
