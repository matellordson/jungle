import { StripTypeScriptTypesOptions } from "module";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

const InputEl = styled.textarea`
  height: 50px;
  width: 100%;
  border: var(--border);
  background-color: var(--background);
  font-family: inherit;
  outline: none;
  padding: 0 10px;
  appearance: none;
  -webkit-appearance: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

export function Textarea({
  id,
  value,
  onChange,
  disabled,
  placeholder,
  name,
  width,
  height,
}: {
  id?: string | undefined;
  value?: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  disabled?: boolean;
  placeholder?: string | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  name?: string | undefined;
  height?: string | undefined;
  width?: string | undefined;
}) {
  return (
    <InputEl
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      style={{
        minHeight: `100px`,
        minWidth: `${width}`,
        maxHeight: `${height}`,
        maxWidth: `${width}`,
        paddingTop: "10px",
      }}
    />
  );
}
