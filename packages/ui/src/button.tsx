import { MouseEventHandler } from "react";
import styled from "styled-components";

const ButtonEl = styled.button`
  background-color: var(--foreground);
  color: var(--background);
  font-family: inherit;
  font-size: 15px;
  text-transform: uppercase;
  height: 40px;
  width: fit-content;
  padding: 0 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  appearance: none;
  -webkit-appearance: none;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

export function Button({
  children,
  type,
  disabled,
  loading,
  onClick,
  style,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  style?: any;
}) {
  return (
    <ButtonEl type={type} disabled={disabled} onClick={onClick} style={style}>
      {loading ? (
        <Icon className="material-symbols-sharp">clock_loader_20</Icon>
      ) : (
        ""
      )}
      {children}
    </ButtonEl>
  );
}
