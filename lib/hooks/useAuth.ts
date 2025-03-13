"use client";

import { useState, useCallback } from 'react';
import { mockAuth } from '@/lib/mockData';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await mockAuth.login(email, password);
      // In a real app, this would set cookies/tokens
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await mockAuth.register(name, email, password);
      // In a real app, this would set cookies/tokens
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return {
    login,
    register,
    isLoading,
    error
  };
}