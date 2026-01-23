"use client";

import styled from "styled-components";
import { PlugIcon } from "@phosphor-icons/react";

const Wrapper = styled.div`
  background-color: var(--background);
  border-radius: 5px;
  padding: 25px 40px;

  @media only screen and (min-width: 992px) {
    width: 510px;
  }
`;

const LogoWrapper = styled.div`
  background-color: #d6d4d4;
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

const Alert = styled.div`
  height: 60px;
  width: 100%;
  background-color: var(--alert-bg);
  border: var(--alert-border);
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  gap: 13px;
  align-items: center;

  & .alert-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      color: var(--alert-text);
    }
  }

  & .title {
    font-size: 16px;
    color: var(--alert-text);
    font-weight: 470;
  }

  & .desc {
    font-size: 14px;
  }
`;

const Footer = styled.p`
  padding-top: 10px;
  font-size: 15px;
`;

import { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Button } from "@repo/ui/button";

export default function ConnectWallet() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <Wrapper>
          <LogoWrapper></LogoWrapper>
          <Title>Connect Wallet into the Trustless Marketplace</Title>
          <Alert>
            <div className="alert-icon">
              <PlugIcon size={25} weight="duotone" />
            </div>
            <div className="text">
              <p className="title">Wallet Connection Required</p>
              <p className="desc">
                Connect your wallet to access the marketplace.
              </p>
            </div>
          </Alert>
          <Button
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "12px",
            }}
          >
            Connect Wallet
          </Button>
          <Footer>By connecting you agree to our Terms and Conditions</Footer>
        </Wrapper>
      </Modal>
    </div>
  );
}
