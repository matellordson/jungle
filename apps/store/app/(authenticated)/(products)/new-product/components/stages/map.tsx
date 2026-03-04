"use client";

import styled from "styled-components";
import { Toolkit } from "../../../../../../components/toolkit";
import { CircleQuestionMark } from "lucide-react";

const Wrapper = styled.div``;

const MapStage = styled.i`
  font-size: 14px;
  display: none;
  @media only screen and (min-width: 1100px) {
    display: block;
  }
`;

const MapToolkit = styled.div`
  @media only screen and (min-width: 1100px) {
    display: none;
  }

  & svg:hover {
    color: var(--text-light);
    cursor: pointer;
  }
`;

type allStages =
  | "Identity"
  | "Media"
  | "Details & Attributes"
  | "Variations"
  | "Pricing & Inventory"
  | "Logistics"
  | "Publishing";

export default function Map({ currentStage }: { currentStage: allStages }) {
  const stage = currentStage == "Identity" ? '"What is this product?"' : "";
  return (
    <Wrapper>
      <MapStage>{stage}</MapStage>
      <MapToolkit>
        <Toolkit trigger={<CircleQuestionMark size={20} />} content={stage} />
      </MapToolkit>
    </Wrapper>
  );
}
