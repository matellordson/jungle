"use client";
import { ChangeEventHandler } from "react";
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
  value,
  onChange,
  name,
  width,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  width?: string;
}) {
  return (
    <InputEl
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      style={{
        width: width,
      }}
    />
  );
}
