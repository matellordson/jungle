import { ChangeEventHandler } from "react";
import styled from "styled-components";

const InputEl = styled.input`
  height: 50px;
  width: 100%;
  border: var(--border);
  background-color: var(--background);
  font-family: inherit;
  outline: none;
  padding: 0 10px;
`;

export function Input({
  id,
  value,
  onChange,
}: {
  id?: string | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return <InputEl id={id} value={value} onChange={onChange} />;
}
