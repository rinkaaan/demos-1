// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { createSolanaRpcSubscriptions } from '@solana/kit';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
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
  const [rpcEndpoint, setRpcEndpoint] = useState<string>(
    'wss://mainnet.helius-rpc.com/?api-key=27a88f0e-df04-4a0d-8725-b5110e4f4547',
  );
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

  const startSubscription = async () => {
    setIsSubscribed(true);

    try {
      const rpcSubscriptions = createSolanaRpcSubscriptions(rpcEndpoint);
      const abortController = new AbortController();
      const subscription = await rpcSubscriptions
        .slotNotifications()
        .subscribe({ abortSignal: abortController.signal });

      subscriptionRef.current = {
        unsubscribe: () => {
          abortController.abort();
          setIsSubscribed(false);
        },
      };

      (async () => {
        try {
          for await (const slotInfo of subscription) {
            const slot = Number(slotInfo.slot);
            const parent = Number(slotInfo.parent);

            setCurrentSlot(slot);
            setSlots(prev =>
              [
                {
                  slot,
                  timestamp: Date.now(),
                  parent: parent || null,
                },
                ...prev,
              ].slice(0, 50),
            );
          }
        } catch (e: any) {
          if (e.name !== 'AbortError') {
            console.error('Subscription error:', e);
          }
        }
      })();
    } catch (err) {
      console.error(err);
      setIsSubscribed(false);
    }
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
        <ExpandableSection headerText="RPC Configuration">
          <FormField
            label="RPC WebSocket Endpoint"
            description="The Solana RPC WebSocket endpoint to use for subscriptions"
          >
            <Input
              value={rpcEndpoint}
              onChange={({ detail }) => setRpcEndpoint(detail.value)}
              placeholder="wss://mainnet.helius-rpc.com/?api-key=27a88f0e-df04-4a0d-8725-b5110e4f4547"
              disabled={isSubscribed}
            />
          </FormField>
        </ExpandableSection>

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
