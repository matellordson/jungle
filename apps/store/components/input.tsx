"use client";
import styled from "styled-components";

const InputEl = styled.input`
  max-width: 300px;
  border: var(--border);
  background-color: var(--highlight);
  padding: 5px 10px;
  font: inherit;
  color: inherit;
  border-radius: 5px;
`;

export function Input({ type }: { type?: string }) {
  return <InputEl type={type} />;
}
