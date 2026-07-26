"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type WalletContextValue = {
  /** The currently connected wallet address, or null if none. */
  walletAddress: string | null;
  /** Set or update the wallet address. */
  setWalletAddress: (address: string) => void;
  /** Clear the wallet address (disconnect). */
  clearWallet: () => void;
};

// ─────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────

const WalletContext = createContext<WalletContextValue | null>(null);

// ─────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [walletAddress, setAddress] = useState<string | null>(null);

  const setWalletAddress = useCallback((address: string) => {
    setAddress(address);
  }, []);

  const clearWallet = useCallback(() => {
    setAddress(null);
  }, []);

  const value: WalletContextValue = {
    walletAddress,
    setWalletAddress,
    clearWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);

  if (context === null) {
    throw new Error("useWallet must be used within a <WalletProvider>");
  }

  return context;
}
