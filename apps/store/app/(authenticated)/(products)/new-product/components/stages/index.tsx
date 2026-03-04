"use client";

import styled from "styled-components";
import Map from "./map";
import { useState } from "react";
import { Identity } from "./levels/Identity";
import Logo from "../logo";
import { Button } from "../../../../../../components/button";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: auto;
  padding: 0 5px;

  @media only screen and (min-width: 1500px) {
    max-width: 1500px;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  @media only screen and (min-width: 1500px) {
    padding: 10px 0;
  }
`;

const MapControl = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MapControlDivider = styled.div`
  height: 20px;
  width: 1px;
  background-color: transparent;
  border: var(--border);
`;

const StageWrapper = styled.div`
  margin-top: 100px;
`;

const StageContent = styled.div``;

type allStages =
  | "Identity"
  | "Media"
  | "Details & Attributes"
  | "Variations"
  | "Pricing & Inventory"
  | "Logistics"
  | "Publishing";

export default function Stages() {
  const [stage, setState] = useState<allStages>("Identity");

  return (
    <Wrapper>
      <MapWrapper>
        <Logo />
        <MapControl>
          <Map currentStage={stage!} />
          <MapControlDivider />
          <Button>Continue</Button>
        </MapControl>
      </MapWrapper>
      <StageWrapper>
        <StageContent>{stage === "Identity" ? <Identity /> : ""}</StageContent>
      </StageWrapper>
    </Wrapper>
  );
}
