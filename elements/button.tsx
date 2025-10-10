import styled from "styled-components";

export const Button = styled.button<{ $variant?: "default" | "icon" }>`
  padding: 1rem 0;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--bg-accent);
  color: var(--text-accent);

  /* applies to only icon button */
  display: ${(props) => (props.$variant == "icon" ? "flex" : "")};
  justify-content: ${(props) => (props.$variant == "icon" ? "center" : "")};
  align-items: ${(props) => (props.$variant == "icon" ? "center" : "")};
  gap: ${(props) => (props.$variant == "icon" ? "0.2rem" : "")};

  &:hover {
    filter: opacity(90%);
  }
`;
