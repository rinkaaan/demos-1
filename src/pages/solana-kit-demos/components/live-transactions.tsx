// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import { address, createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
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
  amount?: number;
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
  {
    id: 'amount',
    header: 'Amount (SOL)',
    cell: item => (item.amount !== undefined ? item.amount.toFixed(4) : '-'),
  },
];

export const LiveTransactions = () => {
  const [rpcEndpoint, setRpcEndpoint] = useState<string>(
    'wss://mainnet.helius-rpc.com/?api-key=27a88f0e-df04-4a0d-8725-b5110e4f4547',
  );
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

  const startSubscription = async () => {
    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    setError(null);
    setIsSubscribed(true);

    try {
      const rpcSubscriptions = createSolanaRpcSubscriptions(rpcEndpoint);
      const rpc = createSolanaRpc(rpcEndpoint.replace('wss://', 'https://'));
      const walletAddr = address(walletAddress);
      const abortController = new AbortController();

      const subscription = await rpcSubscriptions
        .logsNotifications({ mentions: [walletAddr] })
        .subscribe({ abortSignal: abortController.signal });

      subscriptionRef.current = {
        unsubscribe: () => {
          abortController.abort();
          setIsSubscribed(false);
        },
      };

      // Process notifications
      (async () => {
        try {
          for await (const notification of subscription) {
            let amount: number | undefined;
            let type: 'incoming' | 'outgoing' = 'incoming';

            try {
              const tx = await rpc
                .getTransaction(notification.value.signature, {
                  encoding: 'jsonParsed',
                  maxSupportedTransactionVersion: 0,
                })
                .send();

              if (tx && tx.meta && tx.transaction && 'message' in tx.transaction) {
                const accountKeys = tx.transaction.message.accountKeys;
                const accountIndex = accountKeys.findIndex(k => k.pubkey === walletAddress);

                if (accountIndex !== -1) {
                  const preBalance = Number(tx.meta.preBalances[accountIndex]);
                  const postBalance = Number(tx.meta.postBalances[accountIndex]);
                  const diff = (postBalance - preBalance) / 1e9;

                  amount = Math.abs(diff);
                  type = diff >= 0 ? 'incoming' : 'outgoing';
                }
              }
            } catch (err) {
              console.error('Failed to fetch transaction details:', err);
            }

            setTransactions(prev =>
              [
                {
                  signature: notification.value.signature,
                  slot: Number(notification.context.slot),
                  timestamp: Date.now(),
                  type,
                  amount,
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
      setError('Failed to start subscription');
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
