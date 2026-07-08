"use client";

import { useCallback, useEffect, useState } from "react";
import * as storage from "@/services/localStorage";
import { showError, showInfo, showSuccess } from "@/services/toast";
import { TOAST_MESSAGES } from "@/utils/constants";
import type { AuthState, LoginCredentials } from "@/types/auth";

const DEFAULT_AUTH: AuthState = { isAuthenticated: false, username: null };

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(DEFAULT_AUTH);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount to avoid SSR/hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuth(storage.getAuth());
    setIsLoaded(true);
  }, []);

  const login = useCallback((credentials: LoginCredentials): boolean => {
    if (storage.validateCredentials(credentials)) {
      const next: AuthState = {
        isAuthenticated: true,
        username: credentials.username,
      };
      storage.saveAuth(next);
      setAuth(next);
      showSuccess(TOAST_MESSAGES.LOGIN_SUCCESS);
      return true;
    }
    showError(TOAST_MESSAGES.INVALID_CREDENTIALS);
    return false;
  }, []);

  const logout = useCallback(() => {
    storage.logout();
    setAuth(DEFAULT_AUTH);
    showInfo(TOAST_MESSAGES.LOGGED_OUT);
  }, []);

  return {
    isAuthenticated: auth.isAuthenticated,
    username: auth.username,
    isLoaded,
    login,
    logout,
  };
}
