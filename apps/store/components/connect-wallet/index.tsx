"use client";

import styled from "styled-components";
import { WalletMetamask } from "@web3icons/react";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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
  gap: 10px;
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
`;

const Footer = styled.p`
  padding-top: 10px;
  font-size: 15px;
`;

export default function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
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
                }
              }}
            >
              Connect Wallet
            </Button>
          </div>
        ))}
        <Footer>
          By connecting you agree to our{" "}
          <Link href={"#"}>Terms and Conditions</Link>
        </Footer>
      </Wrapper>
    </Container>
  );
}
