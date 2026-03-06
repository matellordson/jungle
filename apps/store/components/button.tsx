"use client";

import React from "react";
import styled from "styled-components";

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
`;

export function Button({
  children,
  style,
  onClick,
  disabled,
  onSubmit,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.FormEventHandler;
  disabled?: boolean;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
}) {
  return (
    <ButtonEl
      style={style}
      onClick={onClick}
      disabled={disabled}
      onSubmit={onSubmit}
    >
      {children}
    </ButtonEl>
  );
}
