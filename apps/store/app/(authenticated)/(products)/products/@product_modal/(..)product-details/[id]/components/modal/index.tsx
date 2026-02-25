"use client";

import { JSX } from "react";
import { Drawer } from "vaul";
import styled, { keyframes } from "styled-components";

const StyledOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
`;

const StyledContent = styled(Drawer.Content)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: var(--background);
  padding: 1.5rem;
  outline: none;
  top: 5vh;
`;

const StyledHandle = styled(Drawer.Handle)`
  background-color: var(--accent) !important;
  width: 200px !important;
  height: 8px !important;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export function ProductModal({
  title,
  content,
}: {
  title: JSX.Element;
  content: JSX.Element;
}) {
  return (
    <Drawer.Root setBackgroundColorOnScale={false} defaultOpen={true}>
      <Drawer.Portal>
        <StyledOverlay />
        <StyledContent>
          <StyledHandle />
          <Drawer.Title>{title}</Drawer.Title>
          <Drawer.Description>Description</Drawer.Description>
          {content}
        </StyledContent>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
