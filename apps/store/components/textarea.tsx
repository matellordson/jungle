"use client";
import styled from "styled-components";

const TextareaEl = styled.textarea`
  border: var(--border);
  background-color: var(--highlight);
  padding: 10px 10px;
  font: inherit;
  color: inherit;
  border-radius: 5px;
  height: 100px;
  text-align: start;
  vertical-align: top;
  resize: none;

  &:focus {
    background-color: var(--highlight);
  }

  &::placeholder {
    color: var(--mute-text);
  }
`;

export function TextArea({ placeholder }: { placeholder: string }) {
  return <TextareaEl placeholder={placeholder} />;
}
