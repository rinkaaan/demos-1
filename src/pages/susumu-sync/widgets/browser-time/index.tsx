// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import {
  barChartInstructions,
  commonChartProps,
  dateFormatter,
  numberTickFormatter,
  useHighcharts,
} from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { browserTimeData, browserTimeSeries } from './data';

function BrowserTimeHeader() {
  return (
    <Header variant="h2" description="Daily browser time by website" actions={undefined}>
      Browser time
    </Header>
  );
}

function BrowserTimeContent() {
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
        title: 'Date',
        categories: browserTimeData.map(datum => dateFormatter(datum.date)),
      }}
      yAxis={{ title: 'Total browser time (minutes)', min: 0, max: 600, valueFormatter: numberTickFormatter }}
      ariaLabel="Browser time"
      series={browserTimeSeries}
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Bar chart showing total browser time per website over the last 15 days. ${barChartInstructions}`,
        seriesFilterLabel: 'Filter displayed websites',
        seriesFilterPlaceholder: 'Filter websites',
      }}
      tooltip={{
        point: ({ item }) => ({
          key: item.series.name,
          value: (
            <Link
              external={true}
              href="#"
              ariaLabel={`See details for ${item.y} minutes on ${item.series.name} (opens in a new tab)`}
            >
              {item.y}
            </Link>
          ),
        }),
      }}
    />
  );
}

function BrowserTimeFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View browser history
      </Link>
    </Box>
  );
}
export const browserTime: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: 'Browser time',
    description: 'Daily browser time by website',
    header: BrowserTimeHeader,
    content: BrowserTimeContent,
    footer: BrowserTimeFooter,
    staticMinHeight: 560,
  },
};
