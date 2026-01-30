"use client";

import styled, { keyframes } from "styled-components";
import { WalletMetamask } from "@web3icons/react";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useSignMessage } from "wagmi";
import { ActiveWalletPage } from "./active-wallet";
import { Loader, ToggleLeft, ToggleRight } from "lucide-react";
import { redirect } from "next/navigation";

const spin = keyframes`
from {
  transform: rotate(0deg);
} to {
  transform: rotate(360deg);
}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  background-color: var(--background);
  border-radius: 5px;
  padding: 10px;

  @media only screen and (min-width: 992px) {
    width: 510px;
    padding: 25px 40px;
  }
`;

const LogoWrapper = styled.div`
  height: 100px;
  width: 100px;
  margin: auto;
`;

const Title = styled.p`
  font-size: 25px;
  text-align: center;
  font-weight: 470;
  max-width: 330px;
  margin: auto;
  color: var(--text-dark);
  padding-top: 20px;
`;

const Account = styled.div`
  height: 60px;
  width: 100%;
  border: var(--border);
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--foreground);
    transition: background-color 0.4s ease;
  }

  & .connector {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .name {
    font-size: 17px;
    font-weight: 450;
    color: var(--text-dark);
  }

  & .content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & .state {
    transition: all 2s ease;
  }

  & .spinner {
    animation: ${spin} infinite 2s forwards linear;
  }
`;

const Footer = styled.p`
  padding-top: 10px;
  font-size: 15px;
`;

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { address, isConnected, isConnecting, isReconnecting, status } =
    useAccount();
  const { disconnect, isPending } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [hasSession, setHasSession] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);

  const authorizeWallet = async () => {
    try {
      const nonceRes = await fetch(`${API_URL}/auth/nonce`, {
        credentials: "include",
      });

      if (!nonceRes.ok) {
        throw new Error("Failed to get nonce");
      }

      const { nonce } = await nonceRes.json();

      const message = `Sign this message to authenticate with your wallet.\n\nNonce: ${nonce}`;
      const signature = await signMessageAsync({ message });

      const verifyRes = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ address, signature }),
      });

      if (!verifyRes.ok) {
        const error = await verifyRes.json();
        throw new Error(error.error || "Verification failed");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
    } finally {
      saveAddress();
      redirect("/");
    }
  };

  const saveAddress = async () => {
    try {
      const res = await fetch(`${API_URL}/user/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ data: { message: "hello" } }),
      });

      if (!res.ok) {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const api = await fetch(`${API_URL}/auth/session`, {
        credentials: "include",
      });
      const data = await api.json();
      setHasSession(data.valid);
      setSessionLoading(false);
    };
    checkSession();
  });

  if (hasSession) {
    return <>{sessionLoading ? "Loading..." : <ActiveWalletPage />}</>;
  } else {
    return (
      <>
        {sessionLoading ? (
          "Loading..."
        ) : (
          <Container>
            <Wrapper>
              <LogoWrapper>
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  height={100}
                  width={100}
                  preload={true}
                />
              </LogoWrapper>
              <Title>Connect Wallet into the Trustless Marketplace</Title>
              {connectors.map((connector) => (
                <div key={connector.name}>
                  <Account
                    onClick={() => {
                      if (isConnected) {
                        disconnect();
                      }
                    }}
                  >
                    <div className="content">
                      <div className="connector">
                        <WalletMetamask variant="branded" size={45} />
                      </div>
                      <div>
                        <p className="name">{connector.name}</p>
                        <p>
                          {address
                            ? address.slice(0, 6) + "..." + address.slice(-4)
                            : "— — — — — —"}
                        </p>
                      </div>
                    </div>
                    <div className="state">
                      {isConnecting || isReconnecting || isPending ? (
                        <Loader size={25} className="spinner" />
                      ) : status == "connected" ? (
                        <ToggleRight
                          size={25}
                          style={{ color: "var(--primary-accent)" }}
                        />
                      ) : (
                        <ToggleLeft size={25} />
                      )}
                    </div>
                  </Account>

                  <Button
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      padding: "12px",
                    }}
                    onClick={() => {
                      if (!isConnected) {
                        connect({ connector });
                      } else {
                        authorizeWallet();
                      }
                    }}
                  >
                    {isConnected ? "Authorize" : "Connect Wallet"}
                  </Button>
                </div>
              ))}
              <Footer>
                By connecting you agree to our{" "}
                <Link href={"#"}>Terms and Conditions</Link>
              </Footer>
            </Wrapper>
          </Container>
        )}
      </>
    );
  }
}
