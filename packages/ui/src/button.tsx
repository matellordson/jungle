"use client";

import React from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  background-color: var(--accent);
  border: none;
  font-size: 17px;
  padding: 10px 15px;
  border-radius: 5px;
  color: #ffffff;
  font-family: inherit;
  font-weight: 450;
  cursor: pointer;
`;

export function Button({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <ButtonEl style={style}>{children}</ButtonEl>;
}
