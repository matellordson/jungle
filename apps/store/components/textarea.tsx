"use client";
import { ChangeEventHandler } from "react";
import styled from "styled-components";

const TextareaEl = styled.textarea`
  border: var(--border);
  background-color: var(--background);
  padding: 10px 10px;
  font: inherit;
  color: var(--text-dark);
  border-radius: 5px;
  height: 100px;
  text-align: start;
  vertical-align: top;
  resize: none;

  &:focus {
    background-color: var(--input-bg);
  }

  &::placeholder {
    color: var(--mute-text);
  }
`;

export function TextArea({
  placeholder,
  value,
  onChange,
  name,
}: {
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  name: string;
}) {
  return (
    <TextareaEl
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
}
