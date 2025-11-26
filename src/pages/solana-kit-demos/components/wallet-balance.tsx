// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useRef, useState } from 'react';
import { address, createSolanaRpc } from '@solana/kit';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import Input, { InputProps } from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';

interface TokenBalance {
  mint: string;
  amount: string;
  decimals: number;
  symbol?: string;
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

export const WalletBalance = () => {
  const [rpcEndpoint, setRpcEndpoint] = useState<string>(
    'https://mainnet.helius-rpc.com/?api-key=27a88f0e-df04-4a0d-8725-b5110e4f4547',
  );
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [walletAddressError, setWalletAddressError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [solBalance, setSolBalance] = useState<string | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const walletAddressRef = useRef<InputProps.Ref>(null);

  const fetchBalance = async () => {
    const errorText = validateWalletAddress(walletAddress);
    if (errorText) {
      setWalletAddressError(errorText);
      walletAddressRef.current?.focus();
      return;
    }

    setLoading(true);
    setWalletAddressError('');
    setSolBalance(null);
    setTokenBalances([]);

    try {
      const rpc = createSolanaRpc(rpcEndpoint);
      const walletAddr = address(walletAddress);
      const { value: balance } = await rpc.getBalance(walletAddr).send();
      const solBalanceLamports = Number(balance);
      const solBalanceSOL = (solBalanceLamports / 1e9).toFixed(4);

      setSolBalance(solBalanceSOL);

      // Fetch token accounts (USDC and USDT)
      const TOKEN_PROGRAM_ID = address('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

      try {
        const { value: tokenAccounts } = await rpc
          .getTokenAccountsByOwner(walletAddr, { programId: TOKEN_PROGRAM_ID }, { encoding: 'jsonParsed' })
          .send();

        const relevantMints: Record<string, string> = {
          EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: 'USDC',
          Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: 'USDT',
        };

        const tokens: TokenBalance[] = [];

        if (Array.isArray(tokenAccounts)) {
          for (const account of tokenAccounts) {
            // account.account.data is typed as generic, so we cast to access parsed fields
            const data = account.account.data as any;
            if (data && data.parsed && data.parsed.info) {
              const info = data.parsed.info;
              const mint = info.mint;

              if (relevantMints[mint]) {
                tokens.push({
                  mint,
                  amount: info.tokenAmount.amount,
                  decimals: info.tokenAmount.decimals,
                  symbol: relevantMints[mint],
                });
              }
            }
          }
        }
        setTokenBalances(tokens);
      } catch (tokenErr) {
        console.error('Failed to fetch token accounts:', tokenErr);
        // Non-fatal error, just log it and show empty/partial results
      }
    } catch (err) {
      console.error(err);
      setWalletAddressError(err instanceof Error ? err.message : 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const formatTokenAmount = (amount: string, decimals: number): string => {
    const num = parseFloat(amount);
    return (num / Math.pow(10, decimals)).toFixed(4);
  };

  return (
    <Container header={<Header variant="h2">Wallet Balance</Header>}>
      <SpaceBetween size="m">
        <ExpandableSection headerText="RPC Configuration">
          <FormField label="RPC Endpoint" description="The Solana RPC endpoint to use for fetching data">
            <Input
              value={rpcEndpoint}
              onChange={({ detail }) => setRpcEndpoint(detail.value)}
              placeholder="https://mainnet.helius-rpc.com/?api-key=27a88f0e-df04-4a0d-8725-b5110e4f4547"
            />
          </FormField>
        </ExpandableSection>

        <FormField
          label="Wallet Address"
          description="Enter a Solana wallet address to view its balances"
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
            <Button onClick={fetchBalance} loading={loading} variant="primary">
              Fetch Balance
            </Button>
          </Grid>
        </FormField>

        {loading && (
          <Box textAlign="center" padding="l">
            <Spinner />
          </Box>
        )}

        {solBalance !== null && !loading && (
          <SpaceBetween size="m">
            <Box>
              <Box variant="h3" margin={{ bottom: 'xs' }}>
                SOL Balance
              </Box>
              <Box variant="h2" color="text-status-success">
                {solBalance} SOL
              </Box>
            </Box>

            {tokenBalances.length > 0 && (
              <Box>
                <Box variant="h3" margin={{ bottom: 's' }}>
                  Token Balances
                </Box>
                <SpaceBetween size="xs">
                  {tokenBalances.map((token, index) => (
                    <Box key={index} padding="s" variant="div">
                      <SpaceBetween direction="horizontal" size="m">
                        <Box>
                          <Box fontWeight="bold">{token.symbol || 'Unknown Token'}</Box>
                          <Box variant="small" color="text-body-secondary">
                            {token.mint.substring(0, 8)}...{token.mint.substring(token.mint.length - 8)}
                          </Box>
                        </Box>
                        <Box variant="h3">{formatTokenAmount(token.amount, token.decimals)}</Box>
                      </SpaceBetween>
                    </Box>
                  ))}
                </SpaceBetween>
              </Box>
            )}
          </SpaceBetween>
        )}
      </SpaceBetween>
    </Container>
  );
};
