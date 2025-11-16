// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import StatusIndicator, { StatusIndicatorProps } from '@cloudscape-design/components/status-indicator';
import Table, { TableProps } from '@cloudscape-design/components/table';

import { isVisualRefresh } from '../../../../common/apply-mode';
import { WidgetConfig } from '../interfaces';

interface Item {
  name: string;
  statusText: string;
  status: StatusIndicatorProps.Type;
}

function TodosHeader() {
  return (
    <Header
      counter="(150)"
      actions={
        <Button variant="normal" href="#" iconName="add-plus" iconAlign="right">
          Add new todo
        </Button>
      }
    >
      Todos
    </Header>
  );
}

function TodosFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View all todos
      </Link>
    </Box>
  );
}

const todosDefinition: TableProps<Item>['columnDefinitions'] = [
  {
    id: 'name',
    header: 'Todo',
    cell: item => <Link href="#">{item.name}</Link>,
    isRowHeader: true,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ statusText, status }) => <StatusIndicator type={status}>{statusText}</StatusIndicator>,
  },
];

const todosItems: TableProps<Item>['items'] = [
  { name: 'Complete project documentation', statusText: 'Late', status: 'error' },
  { name: 'Review pull requests', statusText: 'Not started', status: 'pending' },
  { name: 'Update dependencies', statusText: 'Finished', status: 'success' },
  { name: 'Fix critical bugs', statusText: 'Late', status: 'error' },
  { name: 'Implement new feature', statusText: 'In progress', status: 'in-progress' },
];

function TodosContent() {
  return (
    <Table
      enableKeyboardNavigation={true}
      variant="borderless"
      resizableColumns={false}
      items={todosItems}
      columnDefinitions={todosDefinition}
    />
  );
}

export const todos: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: 'Todos',
    description: 'View all your todos',
    disableContentPaddings: !isVisualRefresh,
    header: TodosHeader,
    content: TodosContent,
    footer: TodosFooter,
    staticMinHeight: 560,
  },
};
