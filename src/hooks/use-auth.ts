"use client";

import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const _username = localStorage.getItem("username");

  const deauthenticate = useCallback(() => {
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername(null);
  }, []);

  useEffect(() => {
    if (_username) {
      setIsAuthenticated(true);
      setUsername(_username);
    } else {
      setIsAuthenticated(false);
      setUsername(null);
    }
  }, [_username]);

  return { isAuthenticated, username, deauthenticate };
}
