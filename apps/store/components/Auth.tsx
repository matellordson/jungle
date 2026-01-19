"use client";

import { useAccount, useSignMessage } from "wagmi";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function Auth() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = async () => {
    if (!address || !isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      // Step 1: Request nonce from server
      const nonceRes = await fetch(`${API_URL}/auth/nonce`, {
        credentials: "include", // Important! Sends cookies
      });

      if (!nonceRes.ok) {
        throw new Error("Failed to get nonce");
      }

      const { nonce } = await nonceRes.json();

      // Step 2: Sign message with nonce
      const message = `Sign this message to authenticate with your wallet.\n\nNonce: ${nonce}`;
      const signature = await signMessageAsync({ message });

      // Step 3: Verify signature on server
      const verifyRes = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important! Receives cookies
        body: JSON.stringify({ address, signature }),
      });

      if (!verifyRes.ok) {
        const error = await verifyRes.json();
        throw new Error(error.error || "Verification failed");
      }

      const data = await verifyRes.json();
      setIsAuthenticated(true);
      console.log("Authenticated:", data);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      console.error("Auth error:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!isConnected) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div>
        <p>
          ✓ Authenticated with {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={handleAuth} disabled={isAuthenticating}>
        {isAuthenticating ? "Authenticating..." : "Sign In with Wallet"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
