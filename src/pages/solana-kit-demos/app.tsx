// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tabs from '@cloudscape-design/components/tabs';

import { CustomAppLayout } from '../commons/common-components';
import { LiveTransactions } from './components/live-transactions';
import { Navigation } from './components/navigation';
import { SlotNotifications } from './components/slot-notifications';
import { TransactionHistory } from './components/transaction-history';
import { WalletBalance } from './components/wallet-balance';

const Breadcrumbs = () => (
  <BreadcrumbGroup
    items={[{ text: 'Solana Kit Demos', href: '#/solana-kit-demos' }]}
    onFollow={event => event.preventDefault()}
  />
);

export function App() {
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const [activeSection, setActiveSection] = useState<'http' | 'websocket'>('http');
  const [activeTabId, setActiveTabId] = useState<string>('wallet-balance');

  useEffect(() => {
    // Determine active section from hash
    const hash = window.location.hash;
    if (hash.includes('/websocket')) {
      setActiveSection('websocket');
      // Set first tab of websocket section
      setActiveTabId('live-transactions');
    } else {
      setActiveSection('http');
      // Set first tab of http section
      setActiveTabId('wallet-balance');
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('/websocket')) {
        setActiveSection('websocket');
        // Set first tab of websocket section
        setActiveTabId('live-transactions');
      } else {
        setActiveSection('http');
        // Set first tab of http section
        setActiveTabId('wallet-balance');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const httpTabs = [
    {
      label: 'Wallet Balance',
      id: 'wallet-balance',
      content: <WalletBalance />,
    },
    {
      label: 'Transaction History',
      id: 'transaction-history',
      content: <TransactionHistory />,
    },
  ];

  const websocketTabs = [
    {
      label: 'Live Transactions',
      id: 'live-transactions',
      content: <LiveTransactions />,
    },
    {
      label: 'Slot Notifications',
      id: 'slot-notifications',
      content: <SlotNotifications />,
    },
  ];

  const getActiveHref = () => {
    return activeSection === 'websocket' ? '#/solana-kit-demos/websocket' : '#/solana-kit-demos/http';
  };

  return (
    <CustomAppLayout
      ref={appLayout}
      content={
        <SpaceBetween size="m">
          <Header variant="h1">Solana Kit API Demos</Header>
          <SpaceBetween size="l">
            <Tabs
              tabs={activeSection === 'http' ? httpTabs : websocketTabs}
              activeTabId={activeTabId}
              onChange={({ detail }) => setActiveTabId(detail.activeTabId)}
              ariaLabel={`Solana Kit ${activeSection} demos`}
            />
          </SpaceBetween>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={<Navigation activeHref={getActiveHref()} />}
      toolsHide
    />
  );
}
