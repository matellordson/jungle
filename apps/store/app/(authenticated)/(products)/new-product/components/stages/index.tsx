"use client";

import styled from "styled-components";
import Map from "./map";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const MapWrapper = styled.div`
  background-color: var(--foreground);
  height: 100vh;
  width: 400px;
  border-right: var(--border);
`;

const StageWrapper = styled.div`
  background-color: var(--background);
  height: 100vh;
  width: 100%;
`;

export default function Stages() {
  const stage = "First Stage";
  return (
    <Wrapper>
      <MapWrapper>
        <Map stage={stage} />
      </MapWrapper>
      <StageWrapper></StageWrapper>
    </Wrapper>
  );
}
