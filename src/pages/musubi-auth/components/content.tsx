import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, browserTime } from '../widgets';

export function Content() {
  return (
    <Grid gridDefinition={[{ colspan: { l: 4, m: 6, default: 12 } }]}>
      <BaseStaticWidget config={browserTime.data} />
    </Grid>
  );
}
