import React from 'react';
import { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { useSettingsStore } from '../store';
import { DensityPreferencesDialog } from './density-preferences';

export function SettingsPage() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const density = useSettingsStore(state => state.density);

  // Capitalize the first letter of the density value for display
  const densityLabel = density.charAt(0).toUpperCase() + density.slice(1);

  return (
    <SpaceBetween size="m">
      <Header
        variant="h1"
        description="Choose and save your default settings for viewing and interacting with Susumu Sync."
      >
        Settings
      </Header>
      <Container
        header={
          <Header
            variant="h2"
            actions={
              <Button variant="normal" onClick={() => setDialogVisible(true)}>
                Edit
              </Button>
            }
            description="Customize your default layout and navigation settings for the DynamoDB console."
          >
            Layout and navigation settings
          </Header>
        }
      >
        <KeyValuePairs
          columns={4}
          items={[
            {
              label: 'Content density',
              value: densityLabel,
            },
            {
              label: 'Default entry page',
              value: 'Dashboard',
            },
          ]}
        />
      </Container>
      {dialogVisible && <DensityPreferencesDialog onDismiss={() => setDialogVisible(false)} />}
    </SpaceBetween>
  );
}
