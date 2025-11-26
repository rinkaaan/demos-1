import React, { FC, useEffect, useState } from 'react';

import SpaceBetween from '@cloudscape-design/components/space-between';

import { Content } from './components/content';
import { SolsekiHeader } from './components/header';
import { ProductDetailContent } from './components/product-detail';
import { SettingsPage } from './components/settings';

const pages: Record<string, FC> = {
  '/': DashboardPage,
  '/solseki': ProductDetailPage,
  '/settings': SettingsPage,
};

function DashboardPage() {
  return (
    <SpaceBetween size="m">
      <SolsekiHeader actions={undefined} />
      <Content />
    </SpaceBetween>
  );
}

function ProductDetailPage() {
  return <ProductDetailContent />;
}

function NotFound() {
  return <div>Not found</div>;
}

interface RouterProps {
  initialPage?: string;
}

export function Router({ initialPage = '/' }: RouterProps) {
  const [currentPagePath, setCurrentPage] = useState(window.location.hash.substring(1) || initialPage);

  useEffect(() => {
    const handler = () => setCurrentPage(window.location.hash.substring(1));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPagePath]);

  const CurrentPage = currentPagePath in pages ? pages[currentPagePath] : NotFound;

  return <CurrentPage />;
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.substring(1) || '/');

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.hash.substring(1));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return {
    currentPath,
    navigate: (newPage: string) => (location.hash = `#${newPage}`),
  };
}
