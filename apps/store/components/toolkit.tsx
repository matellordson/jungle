"use client";

import {
  useFloating,
  useHover,
  useInteractions,
  arrow,
  FloatingArrow,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { JSX, useRef, useState } from "react";
import styled from "styled-components";

const ToolkitContent = styled.i`
  background-color: var(--toolkit-bg);
  padding: 5px 10px;
  font-size: 13px;
  color: var(--toolkit-text);
  border-radius: 5px;
  box-shadow: var(--shadow);
`;

export function Toolkit({
  trigger,
  content,
}: {
  trigger: JSX.Element;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ToolkitContent>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill="var(--toolkit-bg)"
            />
            {content}
          </ToolkitContent>
        </div>
      )}
    </>
  );
}
