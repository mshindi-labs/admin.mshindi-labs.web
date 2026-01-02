'use client';

import * as React from 'react';
import type { FixtureCartItem } from '@/types/fixture-cart';

const STORAGE_KEY = 'tactika-fixture-cart';

/**
 * Hook return type for fixture cart
 */
interface UseFixtureCartReturn {
  /** Array of cart items */
  items: FixtureCartItem[];
  /** Add a fixture to the cart */
  addFixture: (id: number, homeTeam: string, awayTeam: string) => void;
  /** Remove a fixture from the cart by ID */
  removeFixture: (id: number) => void;
  /** Clear all items from the cart */
  clearCart: () => void;
  /** Check if a fixture is already in the cart */
  isInCart: (id: number) => boolean;
  /** Get the total count of items in the cart */
  count: number;
}

/**
 * Context for fixture cart
 */
const FixtureCartContext = React.createContext<UseFixtureCartReturn | null>(
  null,
);

/**
 * Provider component for fixture cart
 *
 * Manages shared cart state across all components.
 */
export function FixtureCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = React.useState<FixtureCartItem[]>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored) as FixtureCartItem[];
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    return [];
  });

  // Sync across tabs using storage event listener
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newItems = JSON.parse(e.newValue) as FixtureCartItem[];
          setItems(newItems);
        } catch (error) {
          console.error('Error parsing cart from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Persist to localStorage whenever items change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items]);

  const addFixture = React.useCallback(
    (id: number, homeTeam: string, awayTeam: string) => {
      setItems((prevItems) => {
        // Check if already in cart
        if (prevItems.some((item) => item.id === id)) {
          return prevItems;
        }
        // Add new item with timestamp
        const newItem: FixtureCartItem = {
          id,
          homeTeam,
          awayTeam,
          addedAt: new Date().toISOString(),
        };
        return [...prevItems, newItem];
      });
    },
    [],
  );

  const removeFixture = React.useCallback((id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = React.useCallback(
    (id: number) => {
      return items.some((item) => item.id === id);
    },
    [items],
  );

  const count = items.length;

  const value = React.useMemo<UseFixtureCartReturn>(
    () => ({
      items,
      addFixture,
      removeFixture,
      clearCart,
      isInCart,
      count,
    }),
    [items, addFixture, removeFixture, clearCart, isInCart, count],
  );

  return (
    <FixtureCartContext.Provider value={value}>
      {children}
    </FixtureCartContext.Provider>
  );
}

/**
 * Custom hook for managing fixture cart with localStorage persistence
 *
 * Persists cart state across page refreshes and syncs across browser tabs.
 * Must be used within a FixtureCartProvider.
 */
export function useFixtureCart(): UseFixtureCartReturn {
  const context = React.useContext(FixtureCartContext);
  if (!context) {
    throw new Error('useFixtureCart must be used within a FixtureCartProvider');
  }
  return context;
}
