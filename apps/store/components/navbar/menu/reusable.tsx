"use client";

import { JSX, useState } from "react";
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
  useHover,
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
  width: 300px;
`;

export function MenuItem({
  name,
  content,
}: {
  name: string;
  content: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis: 120,
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
        {name}
      </Trigger>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <Content
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </Content>
        </FloatingFocusManager>
      )}
    </>
  );
}
