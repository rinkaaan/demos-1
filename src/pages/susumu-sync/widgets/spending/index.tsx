// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import { barChartInstructions, commonChartProps, numberTickFormatter, useHighcharts } from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { spendingData, spendingSeries } from './data';

function weekFormatter(week: number | null) {
  if (!week) {
    return '';
  }
  const date = new Date(week);
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)

  const startStr = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${startStr}\n${endStr}`;
}

function SpendingHeader() {
  return (
    <Header variant="h2" description="Weekly spending by category" actions={undefined}>
      Spending
    </Header>
  );
}

function SpendingContent() {
  const highcharts = useHighcharts();
  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      stacking="normal"
      fitHeight={true}
      chartHeight={25}
      xAxis={{
        type: 'category',
        title: 'Week',
        categories: spendingData.map(datum => weekFormatter(datum.week)),
      }}
      yAxis={{ title: 'Total spending ($)', min: 0, max: 1000, valueFormatter: numberTickFormatter }}
      ariaLabel="Spending"
      series={spendingSeries}
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Bar chart showing weekly spending per category over the last 12 weeks. ${barChartInstructions}`,
        seriesFilterLabel: 'Filter displayed categories',
        seriesFilterPlaceholder: 'Filter categories',
      }}
      tooltip={{
        point: ({ item }) => ({
          key: item.series.name,
          value: (
            <Link
              external={true}
              href="#"
              ariaLabel={`See details for $${item.y} spent on ${item.series.name} (opens in a new tab)`}
            >
              ${item.y}
            </Link>
          ),
        }),
      }}
    />
  );
}

function SpendingFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View spending details
      </Link>
    </Box>
  );
}
export const spending: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: 'Spending',
    description: 'Weekly spending by category',
    header: SpendingHeader,
    content: SpendingContent,
    footer: SpendingFooter,
    staticMinHeight: 560,
  },
};
