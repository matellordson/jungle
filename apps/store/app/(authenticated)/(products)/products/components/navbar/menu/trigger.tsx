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

const Items = styled.div`
  background-color: var(--foreground);
  padding: 5px;
  border-radius: 5px;
  border: var(--border);
  width: 250px;
  box-shadow: var(--shadow);
`;

export function MenuTrigger({
  title,
  items,
}: {
  title: string;
  items: JSX.Element;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis: 100,
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
        {title}
      </Trigger>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <Items
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {items}
          </Items>
        </FloatingFocusManager>
      )}
    </>
  );
}
