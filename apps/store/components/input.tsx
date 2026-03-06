"use client";
import styled from "styled-components";

const InputEl = styled.input`
  border: var(--border);
  background-color: var(--highlight);
  padding: 10px 10px;
  font: inherit;
  color: var(--text-dark);
  border-radius: 5px;

  &:focus {
    background-color: var(--highlight);
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
