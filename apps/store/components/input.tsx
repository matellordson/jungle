"use client";
import styled from "styled-components";

const InputEl = styled.input`
  border: var(--border);
  background-color: var(--highlight);
  padding: 10px 10px;
  font: inherit;
  color: inherit;
  border-radius: 5px;

  /* iOS Safari fixes */
  -webkit-appearance: none;
  appearance: none;
  -webkit-text-size-adjust: 100%;
  touch-action: manipulation;

  &:focus {
    background-color: var(--highlight);
    outline: none;
  }

  &::placeholder {
    color: var(--mute-text);
  }
`;

export function Input({
  type,
  placeholder,
  width,
}: {
  type?: string;
  placeholder?: string;
  height?: string;
  width?: string;
}) {
  return (
    <InputEl
      type={type}
      placeholder={placeholder}
      style={{
        width: width,
      }}
    />
  );
}
