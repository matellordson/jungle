"use client";

import styled from "styled-components";
import "material-symbols";

const Wrapper = styled.div`
  width: 100%;
`;

const PageName = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  padding-bottom: 20px;
`;

export default function Metrics() {
  return (
    <Wrapper>
      <PageName>Product Performance</PageName>
    </Wrapper>
  );
}
