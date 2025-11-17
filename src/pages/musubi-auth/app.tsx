import React, { useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import { Breadcrumbs, HelpPanelProvider } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { MusubiAuthMainInfo } from './components/header';
import { MusubiAuthSideNavigation } from './components/side-navigation';
import { Router, useRouter } from './router';

import '@cloudscape-design/global-styles/dark-mode-utils.css';

export function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(true);
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <MusubiAuthMainInfo />);
  const appLayout = useRef<AppLayoutProps.Ref>(null);
  const { currentPath } = useRouter();

  const handleToolsContentChange = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayout.current?.focusToolsClose();
  };

  const getBreadcrumbItems = () => {
    if (currentPath === '/musubi-auth') {
      return [];
    }
    if (currentPath === '/settings') {
      return [{ text: 'Settings', href: '#/settings' }];
    }
    return [{ text: 'Dashboard', href: '#/' }];
  };

  return (
    <HelpPanelProvider value={handleToolsContentChange}>
      <CustomAppLayout
        ref={appLayout}
        content={<Router />}
        breadcrumbs={<Breadcrumbs items={getBreadcrumbItems()} rootText="Musubi Auth" rootHref="#/musubi-auth" />}
        navigation={<MusubiAuthSideNavigation />}
        navigationOpen={navigationOpen}
        onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
        tools={toolsContent}
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      />
    </HelpPanelProvider>
  );
}
