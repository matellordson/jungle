"use client";

import styled from "styled-components";
import Logo from "../logo";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const LogoWrapper = styled.div`
  margin-top: 20px;
`;

const StageWrapper = styled.div`
  border-radius: 5px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Stage = styled.div`
  width: 100%;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: var(--highlight);
  border: var(--border);
  gap: 3px;
  box-shadow: var(--shadow);
  filter: blur(10px);

  &.active {
    filter: blur(0px);
  }
`;

const StageDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StageTitle = styled.p`
  font-size: 16px;
  color: var(--text-dark);
`;

const StageDesc = styled.p`
  font-size: 13px;
`;

export default function Map({ currentStage }: { currentStage: string }) {
  const stages = [
    {
      title: "Identity",
      desc: "Name it, describe it, and categorize it.",
    },
    {
      title: "Media",
      desc: "Add photos, a video, or any documents buyers might need.",
    },
    {
      title: " Details & Attributes",
      desc: "Materials, dimensions, care instructions. Details that build trust",
    },
    {
      title: "Variations",
      desc: "Set up sizes, colors, or styles. Skip if one version covers it all.",
    },
    {
      title: "Logistics",
      desc: "Set what you're charging and how many you have on hand.",
    },
    {
      title: "Pricing & Inventory",
      desc: " Weight, packaging, lead time, and where it ships from.",
    },
    {
      title: "Publishing",
      desc: "Set visibility and go live — or save as a draft and come back.",
    },
  ];
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <StageWrapper>
        {stages.map((stage) => (
          <Stage
            key={stage.title}
            className={stage.title === currentStage ? "active" : ""}
          >
            <StageDetail>
              <StageTitle>{stage.title}</StageTitle>
            </StageDetail>

            <StageDesc>{stage.desc}</StageDesc>
          </Stage>
        ))}
      </StageWrapper>
    </Wrapper>
  );
}
