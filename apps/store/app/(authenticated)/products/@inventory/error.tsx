"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
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

export default function ErrorPage({ reset }: { reset: () => void }) {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh(); // tells Next.js to re-fetch server component data
    reset(); // clears the error boundary so the component re-renders
  };

  return (
    <Wrapper>
      <Message>Unable to load. Refresh to try again.</Message>
      <ButtonEl
        onClick={handleRetry}
        style={{
          background: "var(--foreground)",
          border: "var(--border)",
          color: "var(--text-light)",
          fontSize: "15px",
        }}
      >
        Retry
      </ButtonEl>
    </Wrapper>
  );
}
