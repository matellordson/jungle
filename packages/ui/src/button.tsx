"use client";

import React from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  background-color: var(--accent);
  border: none;
  font-size: 17px;
  padding: 10px 15px;
  border-radius: 5px;
  color: var(--accent-bg-text);
  font-family: inherit;
  font-weight: 450;
  cursor: pointer;
`;

export function Button({
  children,
  style,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.FormEventHandler;
  disabled?: boolean;
}) {
  return (
    <ButtonEl style={style} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonEl>
  );
}
