"use client";

import styled from "styled-components";
import Map from "./map";
import { Button } from "@repo/ui/button";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
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
  display: flex;
  flex-direction: column;
`;

const StageContent = styled.div`
  height: 100%;
  width: 100%;
`;

const StageCount = styled.p``;

const StageControlWrapper = styled.div`
  height: 50px;
  width: 100%;
  border-top: var(--border);
  background-color: var(--foreground);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

type allStages =
  | "Identity"
  | "Media"
  | "Details & Attributes"
  | "Variations"
  | "Pricing & Inventory"
  | "Logistics"
  | "Publishing";

export default function Stages() {
  const stage: allStages = "Media";
  return (
    <Wrapper>
      <MapWrapper>
        <Map currentStage={stage!} />
      </MapWrapper>
      <StageWrapper>
        <StageContent>{stage}</StageContent>
        <StageControlWrapper>
          <StageCount>1 of 7</StageCount>
          <Button>Next</Button>
        </StageControlWrapper>
      </StageWrapper>
    </Wrapper>
  );
}
