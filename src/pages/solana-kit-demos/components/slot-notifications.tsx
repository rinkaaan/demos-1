// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table, { TableProps } from '@cloudscape-design/components/table';

interface SlotInfo {
  slot: number;
  timestamp: number;
  parent: number | null;
}

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<SlotInfo>[] = [
  {
    id: 'slot',
    header: 'Slot Number',
    cell: item => item.slot.toLocaleString(),
  },
  {
    id: 'timestamp',
    header: 'Time',
    cell: item => new Date(item.timestamp).toLocaleTimeString(),
  },
  {
    id: 'parent',
    header: 'Parent Slot',
    cell: item => (item.parent ? item.parent.toLocaleString() : 'N/A'),
  },
];

export const SlotNotifications = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [currentSlot, setCurrentSlot] = useState<number | null>(null);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startSubscription = () => {
    setIsSubscribed(true);

    // Note: This is a placeholder implementation
    // In a real implementation, you would use @solana/kit:
    // import { createSolanaRpcSubscriptions } from '@solana/kit';
    // const rpcSubscriptions = createSolanaRpcSubscriptions('wss://api.mainnet-beta.solana.com');
    // const subscription = await rpcSubscriptions.slotNotifications().subscribe();
    //
    // for await (const slotInfo of subscription) {
    //   setCurrentSlot(slotInfo.slot);
    //   setSlots(prev => [{
    //     slot: slotInfo.slot,
    //     timestamp: Date.now(),
    //     parent: slotInfo.parent || null,
    //   }, ...prev].slice(0, 50));
    // }

    // Simulate slot updates (Solana slots advance roughly every 400ms)
    let mockSlot = 200000000;
    setCurrentSlot(mockSlot);

    intervalRef.current = setInterval(() => {
      mockSlot += 1;
      setCurrentSlot(mockSlot);
      setSlots(prev =>
        [
          {
            slot: mockSlot,
            timestamp: Date.now(),
            parent: prev.length > 0 ? prev[0].slot : null,
          },
          ...prev,
        ].slice(0, 50),
      );
    }, 400);

    subscriptionRef.current = {
      unsubscribe: () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsSubscribed(false);
      },
    };
  };

  const stopSubscription = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    setIsSubscribed(false);
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              {isSubscribed ? (
                <Button onClick={stopSubscription} iconName="close">
                  Stop Subscription
                </Button>
              ) : (
                <Button onClick={startSubscription} iconName="notification">
                  Start Subscription
                </Button>
              )}
            </SpaceBetween>
          }
        >
          Slot Notifications
        </Header>
      }
    >
      <SpaceBetween size="m">
        <Box>
          <Box variant="small" color="text-body-secondary" margin={{ bottom: 'xs' }}>
            Monitor real-time slot advancement on the Solana network
          </Box>
        </Box>

        {isSubscribed && currentSlot !== null && (
          <Box padding="m" variant="container">
            <SpaceBetween direction="horizontal" size="m">
              <Box>
                <Box variant="small" color="text-body-secondary">
                  Current Slot
                </Box>
                <Box variant="h1">{currentSlot.toLocaleString()}</Box>
              </Box>
              <Badge color="green">Live</Badge>
            </SpaceBetween>
          </Box>
        )}

        {slots.length > 0 && (
          <Table
            columnDefinitions={COLUMN_DEFINITIONS}
            items={slots}
            empty={
              <Box textAlign="center" padding="l">
                <Box variant="strong">No slot updates yet</Box>
                <Box variant="p" color="text-body-secondary">
                  Slot notifications will appear here when subscription is active.
                </Box>
              </Box>
            }
          />
        )}

        {!isSubscribed && slots.length === 0 && (
          <Box textAlign="center" padding="l" color="text-body-secondary">
            Click "Start Subscription" to begin monitoring slot notifications from the Solana network.
          </Box>
        )}
      </SpaceBetween>
    </Container>
  );
};
