// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { isVisualRefresh } from '../../../../common/apply-mode';
import { WidgetConfig } from '../interfaces';

interface Item {
  name: string;
}

function BookmarksHeader() {
  return (
    <Header
      actions={
        <Button variant="normal" href="#" iconName="add-plus" iconAlign="right">
          Add bookmark
        </Button>
      }
    >
      Bookmarks
    </Header>
  );
}

function BookmarksFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View bookmarks
      </Link>
    </Box>
  );
}

const bookmarksDefinition: TableProps<Item>['columnDefinitions'] = [
  {
    id: 'bookmarks',
    header: 'Bookmarks',
    cell: item => <Link href="#">{item.name}</Link>,
    isRowHeader: true,
  },
];

const bookmarksItems: TableProps<Item>['items'] = [
  { name: 'Amazon Web Services' },
  { name: 'Cloudscape Design System' },
  { name: 'React Documentation' },
  { name: 'TypeScript Handbook' },
  { name: 'GitHub' },
];

function BookmarksContent() {
  return (
    <Table
      enableKeyboardNavigation={true}
      variant="borderless"
      resizableColumns={false}
      items={bookmarksItems}
      columnDefinitions={bookmarksDefinition}
    />
  );
}

export const bookmarks: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: 'Bookmarks',
    description: 'View all your bookmarks',
    disableContentPaddings: !isVisualRefresh,
    header: BookmarksHeader,
    content: BookmarksContent,
    footer: BookmarksFooter,
    staticMinHeight: 560,
  },
};
