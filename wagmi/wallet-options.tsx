"use client";

import { useConnect } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { WalletIcon, WalletMetamask } from "@web3icons/react";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <div className="w-fit">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Connect Wallet</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {connectors.map((connector) => (
            <DropdownMenuItem>
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="flex items-center justify-between gap-x-2"
              >
                {connector.name == "MetaMask" ? (
                  <WalletMetamask variant="branded" />
                ) : connector.name == "WalletConnect" ? (
                  <WalletIcon name="wallet connect" variant="branded" />
                ) : (
                  ""
                )}
                {connector.name}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
