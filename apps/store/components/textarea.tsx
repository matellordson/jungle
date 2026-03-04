"use client";
import styled from "styled-components";

const TextareaEl = styled.textarea`
  max-width: 300px;
  border: var(--border);
  background-color: var(--highlight);
  padding: 5px 10px;
  font: inherit;
  color: inherit;
  border-radius: 5px;
`;

export function TextArea() {
  return <TextareaEl />;
}
