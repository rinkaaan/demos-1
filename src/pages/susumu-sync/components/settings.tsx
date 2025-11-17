// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function SettingsPage() {
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
            actions={<Button variant="normal">Edit</Button>}
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
              value: 'Comfortable',
            },
            {
              label: 'Default entry page',
              value: 'Dashboard',
            },
          ]}
        />
      </Container>
    </SpaceBetween>
  );
}
