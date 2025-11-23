// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input, { InputProps } from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import Table, { TableProps } from '@cloudscape-design/components/table';

interface Transaction {
  signature: string;
  slot: number;
  blockTime: number | null;
  status: 'success' | 'failed';
  fee: number;
}

const validateWalletAddress = (value: string): string | undefined => {
  if (!value || !value.trim()) {
    return 'Wallet address is required.';
  }
  // Basic Solana address validation (base58, 32-44 characters)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  if (!base58Regex.test(value.trim())) {
    return 'Please enter a valid Solana wallet address.';
  }
  return undefined;
};

const COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Transaction>[] = [
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
    id: 'blockTime',
    header: 'Time',
    cell: item => {
      if (!item.blockTime) {
        return 'N/A';
      }
      return new Date(item.blockTime * 1000).toLocaleString();
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: item => (
      <Box color={item.status === 'success' ? 'text-status-success' : 'text-status-error'}>
        {item.status === 'success' ? 'Success' : 'Failed'}
      </Box>
    ),
  },
  {
    id: 'fee',
    header: 'Fee (SOL)',
    cell: item => (item.fee / 1e9).toFixed(9),
  },
];

export const TransactionHistory = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletAddressError, setWalletAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const walletAddressRef = useRef<InputProps.Ref>(null);

  const fetchTransactions = async () => {
    const errorText = validateWalletAddress(walletAddress);
    if (errorText) {
      setWalletAddressError(errorText);
      walletAddressRef.current?.focus();
      return;
    }

    setLoading(true);
    setWalletAddressError('');

    try {
      // Note: This is a placeholder implementation
      // In a real implementation, you would use @solana/kit:
      // import { createSolanaRpc, address } from '@solana/kit';
      // const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com');
      // const walletAddr = address(walletAddress);
      // const { value: signatures } = await rpc.getConfirmedSignaturesForAddress2(walletAddr).send();
      // const transactions = await Promise.all(
      //   signatures.map(async (sig) => {
      //     const { value: tx } = await rpc.getTransaction(sig.signature).send();
      //     return {
      //       signature: sig.signature,
      //       slot: sig.slot,
      //       blockTime: sig.blockTime,
      //       status: tx?.meta?.err ? 'failed' : 'success',
      //       fee: tx?.meta?.fee || 0,
      //     };
      //   })
      // );

      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated transactions
      const mockTransactions: Transaction[] = Array.from({ length: 10 }, (_, i) => ({
        signature: `${walletAddress.substring(0, 8)}${i.toString().padStart(64, '0')}`,
        slot: 200000000 + i * 1000,
        blockTime: Math.floor(Date.now() / 1000) - i * 3600,
        status: Math.random() > 0.1 ? 'success' : ('failed' as 'success' | 'failed'),
        fee: Math.floor(Math.random() * 10000),
      }));

      setTransactions(mockTransactions);
    } catch (err) {
      setWalletAddressError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      header={
        <Header
          variant="h2"
          actions={
            <Button
              onClick={fetchTransactions}
              loading={loading}
              disabled={!walletAddress.trim() || !!walletAddressError}
              iconName="refresh"
            >
              Refresh
            </Button>
          }
        >
          Transaction History
        </Header>
      }
    >
      <SpaceBetween size="m">
        <FormField
          label="Wallet Address"
          description="Enter a Solana wallet address to view its transaction history"
          errorText={walletAddressError}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Grid gridDefinition={[{ colspan: { default: 9, xxs: 8 } }, { colspan: { default: 3, xxs: 4 } }]}>
            <Input
              ref={walletAddressRef}
              value={walletAddress}
              onChange={({ detail }) => {
                setWalletAddress(detail.value);
                setWalletAddressError('');
              }}
              onBlur={() => {
                const errorText = validateWalletAddress(walletAddress);
                setWalletAddressError(errorText || '');
              }}
              placeholder="Enter wallet address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)"
              disabled={loading}
              ariaRequired={true}
            />
            <Button onClick={fetchTransactions} loading={loading} variant="primary">
              Load Transactions
            </Button>
          </Grid>
        </FormField>

        {loading && (
          <Box textAlign="center" padding="l">
            <Spinner />
          </Box>
        )}

        {transactions.length > 0 && !loading && (
          <Table
            columnDefinitions={COLUMN_DEFINITIONS}
            items={transactions}
            loading={loading}
            loadingText="Loading transactions"
            empty={
              <Box textAlign="center" padding="l">
                <Box variant="strong">No transactions found</Box>
                <Box variant="p" color="text-body-secondary">
                  This wallet address has no transaction history.
                </Box>
              </Box>
            }
          />
        )}
      </SpaceBetween>
    </Container>
  );
};
