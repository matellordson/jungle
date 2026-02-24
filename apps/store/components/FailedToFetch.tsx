import { Button } from "@repo/ui/button";
import { RefreshCw } from "lucide-react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const ButtonEl = styled(Button)``;

const Message = styled.p`
  font-size: 15px;
`;

export function FailedToFetch() {
  return (
    <Wrapper>
      {/* <RefreshCw /> */}
      <Message>Unable to load content. Refresh to try again.</Message>
      <ButtonEl
        style={{
          backgroundColor: "transparent",
          border: "var(--border)",
          color: "var(--accent)",
          scale: "0.8",
        }}
      >
        Retry
      </ButtonEl>
    </Wrapper>
  );
}
