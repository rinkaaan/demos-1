// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Breadcrumbs, HelpPanelProvider } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { Content } from './components/content';
import { SusumuSyncHeader, SusumuSyncMainInfo } from './components/header';
import { ProductDetailContent } from './components/product-detail';
import { SusumuSyncSideNavigation } from './components/side-navigation';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

type Route = 'dashboard' | 'product-detail';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <SusumuSyncMainInfo />);
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');
  const appLayout = useRef<AppLayoutProps.Ref>(null);

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const handleRouteChange = (route: Route) => {
    setCurrentRoute(route);
  };

  const renderContent = () => {
    if (currentRoute === 'product-detail') {
      return <ProductDetailContent />;
    }
    return (
      <SpaceBetween size="m">
        <SusumuSyncHeader actions={undefined} />
        <Content />
      </SpaceBetween>
    );
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={renderContent()}
        breadcrumbs={<Breadcrumbs items={[{ text: 'Dashboard', href: '#/' }]} rootText="SusumuSync" />}
        navigation={<SusumuSyncSideNavigation onRouteChange={handleRouteChange} currentRoute={currentRoute} />}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        className={currentRoute === 'product-detail' ? 'product-detail-page' : ''}
      />
    </HelpPanelProvider>
  );
}
