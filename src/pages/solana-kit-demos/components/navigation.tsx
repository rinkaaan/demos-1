// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

const navHeader = { text: 'Solana Kit Demos', href: '#/solana-kit-demos' };

export const navItems: SideNavigationProps['items'] = [
  { type: 'link', text: 'HTTP', href: '#/solana-kit-demos/http' },
  { type: 'link', text: 'WebSocket', href: '#/solana-kit-demos/websocket' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Solana Documentation',
    external: true,
    externalIconAriaLabel: 'Opens in a new tab',
    href: 'https://docs.solana.com',
  },
];

const defaultOnFollowHandler: SideNavigationProps['onFollow'] = event => {
  const href = event.detail.href;
  // Allow external links to work normally
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
    return; // Let the browser handle external links
  }
  // Prevent default for internal navigation
  event.preventDefault();
  // Update hash manually to trigger hashchange event
  if (href) {
    window.location.hash = href;
  }
};

interface NavigationProps {
  activeHref?: string;
  header?: SideNavigationProps['header'];
  items?: SideNavigationProps['items'];
  onFollowHandler?: SideNavigationProps['onFollow'];
}

export function Navigation({
  activeHref,
  header = navHeader,
  items = navItems,
  onFollowHandler = defaultOnFollowHandler,
}: NavigationProps) {
  return <SideNavigation items={items} header={header} activeHref={activeHref} onFollow={onFollowHandler} />;
}
