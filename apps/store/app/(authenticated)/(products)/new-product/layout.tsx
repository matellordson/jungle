import { Metadata } from "next";

import styled from "styled-components";
import TextLogo from "./components/text-logo";

const Wrapper = styled.div`
  margin: auto;
  padding: 10px 5px;

  @media only screen and (min-width: 1500px) {
    max-width: 1500px;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;

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

export const metadata: Metadata = {
  title: "New Product",
};

export default function NewProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <MapWrapper>
        <TextLogo />
        <MapControl></MapControl>
      </MapWrapper>
      <StageWrapper>
        <StageContent>{children}</StageContent>
      </StageWrapper>
    </Wrapper>
  );
}
