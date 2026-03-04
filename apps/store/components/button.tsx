"use client";

import React from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  background-color: var(--accent);
  border: none;
  padding: 0px 10px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
  color: var(--accent-bg-text);
  font-family: inherit;
  cursor: pointer;
  font-weight: inherit;
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
