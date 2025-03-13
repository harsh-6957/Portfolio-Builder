"use client";

import { useState, useCallback } from 'react';
import { mockPortfolioActions, type Portfolio } from '@/lib/mockData';

export function usePortfolio() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createPortfolio = useCallback(async (userId: string, data: Partial<Portfolio>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const portfolio = await mockPortfolioActions.create(userId, data);
      return portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const updatePortfolio = useCallback(async (id: string, data: Partial<Portfolio>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const portfolio = await mockPortfolioActions.update(id, data);
      return portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const deletePortfolio = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await mockPortfolioActions.delete(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const togglePublish = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const portfolio = await mockPortfolioActions.togglePublish(id);
      return portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    togglePublish,
    isLoading,
    error
  };
}