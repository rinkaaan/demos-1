import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, bookmarks, browserTime, schedule, spending, todos } from '../widgets';

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
      ]}
    >
      {[todos, schedule, bookmarks, browserTime, spending].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
