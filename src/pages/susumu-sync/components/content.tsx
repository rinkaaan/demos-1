// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Grid from '@cloudscape-design/components/grid';

import { BaseStaticWidget, browserTime, schedule, todos } from '../widgets';

export function Content() {
  return (
    <Grid
      gridDefinition={[
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
        { colspan: { l: 4, m: 6, default: 12 } },
      ]}
    >
      {[todos, browserTime, schedule].map((widget, index) => (
        <BaseStaticWidget key={index} config={widget.data} />
      ))}
    </Grid>
  );
}
