import styled from "styled-components";

export const PageCard = styled.div`
  height: 90vh;
  max-height: 40rem;
  padding: 2rem;
  border-radius: 1rem;

  @media only screen and (min-width: 768px) {
    max-width: 500px;
    margin: auto;
    /* border: 2px solid var(--bg-border); */
    box-shadow: var(--shadow);
  }
`;
