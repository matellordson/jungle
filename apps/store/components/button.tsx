"use client";

import { LoaderCircle } from "lucide-react";
import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const spin = keyframes`
from {
  transform: rotate(0deg);
} to {
  transform: rotate(360deg);
}
`;

const ButtonEl = styled.button`
  background-color: var(--accent);
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  color: var(--accent-bg-text);
  font-family: inherit;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  justify-content: center;
  transition: all 0.4s ease;

  &.pending {
    cursor: not-allowed;
    opacity: 60%;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & svg {
    color: var(--accent-bg-text);
    animation: ${spin} infinite 1s forwards linear;
    transform-origin: center;
  }
`;

export function Button({
  children,
  style,
  onClick,
  onSubmit,
  isPending,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.FormEventHandler;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  isPending?: boolean | false;
}) {
  return (
    <ButtonEl
      style={style}
      onClick={onClick}
      disabled={isPending}
      onSubmit={onSubmit}
      className={isPending ? "pending" : ""}
    >
      {isPending ? (
        <LoadingWrapper>
          <LoaderCircle size={20} /> {children}
        </LoadingWrapper>
      ) : (
        <>{children}</>
      )}
    </ButtonEl>
  );
}
