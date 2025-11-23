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
      // Note: This is a placeholder implementation
      // In a real implementation, you would use @solana/kit:
      // import { createSolanaRpc, address } from '@solana/kit';
      // const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com');
      // const walletAddr = address(walletAddress);
      // const { value: balance } = await rpc.getBalance(walletAddr).send();
      // const solBalanceLamports = Number(balance);
      // const solBalanceSOL = solBalanceLamports / 1e9;

      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulated response
      const mockSolBalance = (Math.random() * 10).toFixed(4);
      setSolBalance(mockSolBalance);

      // Simulated token balances
      const mockTokens: TokenBalance[] = [
        { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', amount: '1250.50', decimals: 6, symbol: 'USDC' },
        { mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', amount: '500.25', decimals: 6, symbol: 'USDT' },
      ];
      setTokenBalances(mockTokens);
    } catch (err) {
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
