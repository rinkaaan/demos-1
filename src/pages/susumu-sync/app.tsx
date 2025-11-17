// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import { Breadcrumbs, HelpPanelProvider } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { SusumuSyncMainInfo } from './components/header';
import { SusumuSyncSideNavigation } from './components/side-navigation';
import { Router, useRouter } from './router';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <SusumuSyncMainInfo />);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const { currentPath } = useRouter();

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const getBreadcrumbItems = () => {
    if (currentPath === '/susumu-sync') {
      return [{ text: 'Product Detail', href: '#/susumu-sync' }];
    }
    return [{ text: 'Dashboard', href: '#/' }];
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={<Router />}
        breadcrumbs={<Breadcrumbs items={getBreadcrumbItems()} rootText="SusumuSync" rootHref="#/susumu-sync" />}
        navigation={<SusumuSyncSideNavigation />}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      />
    </HelpPanelProvider>
  );
}
