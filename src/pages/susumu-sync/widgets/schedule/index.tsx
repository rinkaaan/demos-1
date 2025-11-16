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

interface ScheduleItem {
  time: string;
  event: string;
}

function ScheduleHeader() {
  return (
    <Header
      actions={
        <Button variant="normal" href="#" iconName="add-plus" iconAlign="right">
          Add event
        </Button>
      }
    >
      Today's schedule
    </Header>
  );
}

function ScheduleFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View schedule
      </Link>
    </Box>
  );
}

const scheduleDefinition: TableProps<ScheduleItem>['columnDefinitions'] = [
  {
    id: 'time',
    header: 'Time',
    cell: item => item.time,
    isRowHeader: true,
  },
  {
    id: 'event',
    header: 'Event',
    cell: item => item.event,
  },
];

const scheduleItems: TableProps<ScheduleItem>['items'] = [
  { time: 'All day', event: 'Close and re-open coinbase account' },
  { time: '4 - 5pm', event: 'Schedule dentist appointment' },
  { time: '5 - 6pm', event: 'Get Covid shot' },
  { time: '7 - 7:30pm', event: 'Leave Slack' },
  { time: '8:05 - 8:20pm', event: 'Hiroshi' },
];

function ScheduleContent() {
  return (
    <Table
      enableKeyboardNavigation={true}
      variant="borderless"
      resizableColumns={false}
      items={scheduleItems}
      columnDefinitions={scheduleDefinition}
    />
  );
}

export const schedule: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: "Today's schedule",
    description: 'View your schedule for today',
    disableContentPaddings: !isVisualRefresh,
    header: ScheduleHeader,
    content: ScheduleContent,
    footer: ScheduleFooter,
    staticMinHeight: 560,
  },
};
