"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider as Wagmi } from "wagmi";
import { config } from "../lib/wagmi";

const queryClient = new QueryClient();

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  // 1. Add state to track if the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  // 2. Set mounted to true after the initial render (i.e., on the client)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Prevent rendering the provider tree during SSR to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // 4. Render the provider tree only when mounted on the client
  return (
    <Wagmi config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Wagmi>
  );
}
