import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, solsekiChart, userManagement } from '../widgets';

export function Content() {
  return (
    <Grid gridDefinition={[{ colspan: { l: 12, m: 12, default: 12 } }, { colspan: { l: 6, m: 6, default: 12 } }]}>
      <BaseStaticWidget config={userManagement.data} />
      <BaseStaticWidget config={solsekiChart.data} />
    </Grid>
  );
}
