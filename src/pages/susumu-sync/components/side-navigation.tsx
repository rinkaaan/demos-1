// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

import { Navigation as CommonNavigation } from '../../commons';
import { DensityPreferencesDialog } from './density-preferences';

type Route = 'dashboard' | 'product-detail';

interface SusumuSyncSideNavigationProps {
  onRouteChange: (route: Route) => void;
  currentRoute: Route;
}

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
];

export function SusumuSyncSideNavigation({ onRouteChange, currentRoute }: SusumuSyncSideNavigationProps) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const onFollowHandler: SideNavigationProps['onFollow'] = event => {
    event.preventDefault();
    const href = event.detail.href;

    if (href === '#/density_settings') {
      setDialogVisible(true);
    } else if (href === '#/') {
      onRouteChange('dashboard');
    } else if (href === '#/susumu-sync') {
      onRouteChange('product-detail');
    }
  };

  const activeHref = currentRoute === 'dashboard' ? '#/' : '#/susumu-sync';

  return (
    <>
      <CommonNavigation
        header={{ text: 'Susumu Sync', href: '#/susumu-sync' }}
        items={navItems}
        activeHref={activeHref}
        onFollowHandler={onFollowHandler}
      />
      {dialogVisible && <DensityPreferencesDialog onDismiss={() => setDialogVisible(false)} />}
    </>
  );
}
