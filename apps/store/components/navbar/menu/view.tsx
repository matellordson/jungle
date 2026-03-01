"use client";

import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from "@floating-ui/react";
import styled from "styled-components";

const Trigger = styled.button`
  font: inherit;
  background-color: transparent;
  border: none;
  color: var(--light-text);
  padding: 3px 10px;
  border-radius: 5px;

  &:hover {
    background-color: var(--background);
  }
`;

const Content = styled.div`
  background-color: var(--foreground);
  padding: 10px;
  border-radius: 5px;
  border: var(--border);
`;

export function View() {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis: 50,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <Trigger ref={refs.setReference} {...getReferenceProps()}>
        View
      </Trigger>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <Content
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            Popover element
          </Content>
        </FloatingFocusManager>
      )}
    </>
  );
}
