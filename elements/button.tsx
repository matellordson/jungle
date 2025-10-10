import styled from "styled-components";

export const Button = styled.button`
  padding: 1rem 0;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: opacity(85%);
  }
`;

export const PendingButton = styled(Button)`
  color: green;
`;
