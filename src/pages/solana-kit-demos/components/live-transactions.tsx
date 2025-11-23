// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table, { TableProps } from '@cloudscape-design/components/table';

interface LiveTransaction {
  signature: string;
  slot: number;
  timestamp: number;
  type: 'incoming' | 'outgoing';
}

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<LiveTransaction>[] = [
  {
    id: 'signature',
    header: 'Signature',
    cell: item => (
      <Link external href={`https://solscan.io/tx/${item.signature}`} target="_blank">
        {item.signature.substring(0, 16)}...
      </Link>
    ),
  },
  {
    id: 'slot',
    header: 'Slot',
    cell: item => item.slot.toLocaleString(),
  },
  {
    id: 'timestamp',
    header: 'Time',
    cell: item => new Date(item.timestamp).toLocaleTimeString(),
  },
  {
    id: 'type',
    header: 'Type',
    cell: item => (
      <Badge color={item.type === 'incoming' ? 'green' : 'blue'}>
        {item.type === 'incoming' ? 'Incoming' : 'Outgoing'}
      </Badge>
    ),
  },
];

export const LiveTransactions = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<LiveTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
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
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    setError(null);
    setIsSubscribed(true);

    // Note: This is a placeholder implementation
    // In a real implementation, you would use @solana/kit:
    // import { createSolanaRpcSubscriptions, address } from '@solana/kit';
    // const rpcSubscriptions = createSolanaRpcSubscriptions('wss://api.mainnet-beta.solana.com');
    // const walletAddr = address(walletAddress);
    // const subscription = await rpcSubscriptions.accountNotifications(walletAddr).subscribe();
    //
    // for await (const notification of subscription) {
    //   setTransactions(prev => [{
    //     signature: notification.context.slot.toString(),
    //     slot: notification.context.slot,
    //     timestamp: Date.now(),
    //     type: Math.random() > 0.5 ? 'incoming' : 'outgoing',
    //   }, ...prev].slice(0, 50));
    // }

    // Simulate live updates
    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        const newTx: LiveTransaction = {
          signature: `${walletAddress.substring(0, 8)}${Date.now().toString().padStart(64, '0')}`,
          slot: Math.floor(Math.random() * 200000000) + 200000000,
          timestamp: Date.now(),
          type: Math.random() > 0.5 ? 'incoming' : 'outgoing',
        };
        setTransactions(prev => [newTx, ...prev].slice(0, 50));
      }
    }, 2000);

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
                <Button onClick={startSubscription} disabled={!walletAddress.trim()} iconName="notification">
                  Start Subscription
                </Button>
              )}
            </SpaceBetween>
          }
        >
          Live Transaction Subscription
        </Header>
      }
    >
      <SpaceBetween size="m">
        <FormField
          label="Wallet Address"
          description="Subscribe to real-time transaction notifications for a wallet address"
        >
          <Input
            value={walletAddress}
            onChange={({ detail }) => setWalletAddress(detail.value)}
            placeholder="Enter wallet address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)"
            disabled={isSubscribed}
          />
        </FormField>

        {error && (
          <Box color="text-status-error" padding="s">
            {error}
          </Box>
        )}

        {isSubscribed && (
          <Box padding="s" variant="container">
            <SpaceBetween direction="horizontal" size="xs">
              <Badge color="green">Subscribed</Badge>
              <Box variant="small" color="text-body-secondary">
                Listening for new transactions...
              </Box>
            </SpaceBetween>
          </Box>
        )}

        {transactions.length > 0 && (
          <Table
            columnDefinitions={COLUMN_DEFINITIONS}
            items={transactions}
            empty={
              <Box textAlign="center" padding="l">
                <Box variant="strong">No transactions yet</Box>
                <Box variant="p" color="text-body-secondary">
                  New transactions will appear here when detected.
                </Box>
              </Box>
            }
          />
        )}

        {!isSubscribed && transactions.length === 0 && (
          <Box textAlign="center" padding="l" color="text-body-secondary">
            Enter a wallet address and click "Start Subscription" to begin monitoring for live transactions.
          </Box>
        )}
      </SpaceBetween>
    </Container>
  );
};
