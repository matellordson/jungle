import { PageCard } from "../../elements/page-card";
import { Tittle } from "../../elements/title";
import { Paragraph } from "../../elements/paragraph";
import { Button } from "../../elements/button";
import { PendingButton } from "../../elements/button";

import { useConnect } from "wagmi";

export function ConnectWallet() {
  const { connectors, connect, status, error } = useConnect();

  return (
    <div>
      <PageCard
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "1rem",
            backgroundColor: "gray",
            margin: "auto",
          }}
        ></div>

        <div className="">
          <Tittle $positon="center" $size="bigger">
            Jump Onbaord
          </Tittle>
          <Paragraph $positon="center">
            You in for a jungle adventure? Connect to find treasures.
          </Paragraph>
          {status == "idle" ? (
            <>
              {connectors[0] && (
                <Button
                  key={connectors[0].uid}
                  onClick={() => connect({ connector: connectors[0] })}
                >
                  Connect Wallet
                </Button>
              )}
            </>
          ) : status == "pending" ? (
            <PendingButton>Pending</PendingButton>
          ) : status == "success" ? (
            <Button>Connected</Button>
          ) : status == "error" ? (
            <>
              {connectors[0] && (
                <Button
                  key={connectors[0].uid}
                  onClick={() => connect({ connector: connectors[0] })}
                >
                  Connect Wallet
                </Button>
              )}
            </>
          ) : (
            ""
          )}
          {/* TODO: make this better */}
          {error && <p>An error occured</p>}
        </div>
      </PageCard>
    </div>
  );
}
