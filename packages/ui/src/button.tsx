"use client";

import React from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  background-color: var(--primary-accent);
  border: none;
  font-size: 17px;
  padding: 10px 15px;
  border-radius: 5px;
  color: var(--secondary-accent);
  font-family: inherit;
  font-weight: 450;
  cursor: pointer;
`;

export function Button({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: React.FormEventHandler;
}) {
  return (
    <ButtonEl style={style} onClick={onClick}>
      {children}
    </ButtonEl>
  );
}
