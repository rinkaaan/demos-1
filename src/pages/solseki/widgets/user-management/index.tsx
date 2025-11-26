// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';

import { formatReadOnlyRegion } from '../../../../common/aws-region-utils';
import { WidgetConfig } from '../interfaces';

function UserManagementHeader() {
  return (
    <Header variant="h2" description={`Viewing data from ${formatReadOnlyRegion('us-east-1')} Region`}>
      User management
    </Header>
  );
}

function UserManagementWidget() {
  return (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Total registered users',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Total registered users (12,547)">
              12,547
            </Link>
          ),
        },
        {
          label: 'Avg unique monthly active users',
          value: (
            <Link variant="awsui-value-large" href="#" ariaLabel="Avg unique monthly active users (8,923)">
              8,923
            </Link>
          ),
        },
      ]}
    />
  );
}
export const userManagement: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 3 },
  data: {
    title: 'User management',
    description: 'Overview of user metrics',
    header: UserManagementHeader,
    content: UserManagementWidget,
  },
};
