import { SpinnerIcon } from "@phosphor-icons/react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Style the SpinnerIcon directly
const SpinnerWrapper = styled(SpinnerIcon)`
  width: fit-content;
  height: fit-content;
  padding: 0;
  size: 25;
  transform-origin: center;
  animation: ${spin} 1s linear infinite;
`;

export function Spinner() {
  return <SpinnerWrapper weight="duotone" />;
}
