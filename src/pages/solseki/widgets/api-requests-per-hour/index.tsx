import React from 'react';

import { CartesianChart } from '@cloudscape-design/chart-components';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { commonChartProps, useHighcharts } from '../chart-commons';
import { WidgetConfig } from '../interfaces';

function ApiRequestsPerHourHeader() {
  return (
    <Header variant="h2" description="Solana price over time">
      Solana Price
    </Header>
  );
}

function ApiRequestsPerHourContent() {
  const highcharts = useHighcharts();
  return (
    <CartesianChart
      {...commonChartProps}
      highcharts={highcharts}
      ariaLabel="Solana price line chart"
      chartHeight={400}
      legend={{ enabled: false }}
      noData={{
        statusType: 'finished',
        empty: (
          <div>
            <Box fontWeight="bold" textAlign="center" color="inherit">
              No data available
            </Box>
            <Box textAlign="center" color="inherit">
              There is no data available
            </Box>
          </div>
        ),
        noMatch: (
          <SpaceBetween size="xs" alignItems="center">
            <div>
              <Box fontWeight="bold" textAlign="center" color="inherit">
                No matching data
              </Box>
              <Box color="inherit">There is no matching data to display</Box>
            </div>
            <Button>Clear filter</Button>
          </SpaceBetween>
        ),
        onRecoveryClick: () => {},
      }}
      series={[
        {
          name: 'Solana Price',
          type: 'line',
          data: [
            { x: 1600984800000, y: 58020 },
            { x: 1600985700000, y: 102402 },
            { x: 1600986600000, y: 104920 },
            { x: 1600987500000, y: 94031 },
            { x: 1600988400000, y: 125021 },
            { x: 1600989300000, y: 159219 },
            { x: 1600990200000, y: 193082 },
            { x: 1600991100000, y: 162592 },
            { x: 1600992000000, y: 274021 },
            { x: 1600992900000, y: 264286 },
            { x: 1600993800000, y: 289210 },
            { x: 1600994700000, y: 256362 },
            { x: 1600995600000, y: 257306 },
            { x: 1600996500000, y: 186776 },
            { x: 1600997400000, y: 294020 },
            { x: 1600998300000, y: 385975 },
            { x: 1600999200000, y: 486039 },
            { x: 1601000100000, y: 490447 },
            { x: 1601001000000, y: 361845 },
            { x: 1601001900000, y: 339058 },
            { x: 1601002800000, y: 298028 },
            { x: 1601003700000, y: 231902 },
            { x: 1601004600000, y: 224558 },
            { x: 1601005500000, y: 253901 },
            { x: 1601006400000, y: 102839 },
            { x: 1601007300000, y: 234943 },
            { x: 1601008200000, y: 204405 },
            { x: 1601009100000, y: 190391 },
            { x: 1601010000000, y: 183570 },
            { x: 1601010900000, y: 162592 },
            { x: 1601011800000, y: 148910 },
            { x: 1601012700000, y: 229492 },
            { x: 1601013600000, y: 293910 },
          ],
        },
      ]}
      tooltip={{
        point: ({ item }) => {
          return {
            key: (
              <Link external={true} href="#">
                {item.series.name}
              </Link>
            ),
            value: item.y !== null ? item.y.toString() : null,
          };
        },
      }}
      xAxis={{
        type: 'datetime',
        // title: "Time",
      }}
      yAxis={{
        type: 'linear',
        // title: "Price",
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
    title: 'Solana Price',
    description: 'Solana price over time',
    header: ApiRequestsPerHourHeader,
    content: ApiRequestsPerHourContent,
    footer: ApiRequestsPerHourFooter,
    staticMinHeight: 560,
  },
};
