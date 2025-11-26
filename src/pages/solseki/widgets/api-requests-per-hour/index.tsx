import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';

import {
  barChartInstructions,
  commonChartProps,
  dateTimeFormatter,
  numberTickFormatter,
  useHighcharts,
} from '../chart-commons';
import { WidgetConfig } from '../interfaces';
import { apiRequestsData, apiRequestsSeries } from './data';

function ApiRequestsPerHourHeader() {
  return (
    <Header variant="h2" description="API requests made per hour by method" actions={undefined}>
      API requests per hour
    </Header>
  );
}

function ApiRequestsPerHourContent() {
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
        title: 'Hour',
        categories: apiRequestsData.map(datum => dateTimeFormatter(datum.date)),
      }}
      yAxis={{ title: 'Total API requests', min: 0, valueFormatter: numberTickFormatter }}
      ariaLabel="API requests per hour"
      series={apiRequestsSeries}
      i18nStrings={{
        ...commonChartProps.i18nStrings,
        chartRoleDescription: `Bar chart showing total API requests per hour by HTTP method over the last 24 hours. ${barChartInstructions}`,
        seriesFilterLabel: 'Filter displayed HTTP methods',
        seriesFilterPlaceholder: 'Filter HTTP methods',
      }}
      tooltip={{
        point: ({ item }) => ({
          key: item.series.name,
          value: (
            <Link
              external={true}
              href="#"
              ariaLabel={`See details for ${item.y} ${item.series.name} requests (opens in a new tab)`}
            >
              {item.y}
            </Link>
          ),
        }),
      }}
    />
  );
}

function ApiRequestsPerHourFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View API logs
      </Link>
    </Box>
  );
}
export const apiRequestsPerHour: WidgetConfig = {
  definition: { defaultRowSpan: 4, defaultColumnSpan: 2, minRowSpan: 3 },
  data: {
    title: 'API requests per hour',
    description: 'API requests made per hour by method',
    header: ApiRequestsPerHourHeader,
    content: ApiRequestsPerHourContent,
    footer: ApiRequestsPerHourFooter,
    staticMinHeight: 560,
  },
};
