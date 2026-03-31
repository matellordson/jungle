"use client";

import TextLogo from "./text-logo";
import styled from "styled-components";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  autoUpdate,
} from "@floating-ui/react";
import { useState } from "react";
import { AccountSection } from "./nav-items/account";
import { ProductNavItems } from "../../../apps/store/app/(authenticated)/(products)/nav-item";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 60px;
  background-color: var(--background);
  border-bottom: var(--border);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media only screen and (min-width: 992px) {
    padding: 10px;
  }
`;

const Profile = styled.div`
  height: 30px;
  width: 30px;
  background-color: var(--foreground);
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: var(--border);
  background-color: var(--menu-bg);
  z-index: 9999;
  min-width: 200px;
`;

const DropDownItemsWrapper = styled.div``;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(1), flip()],
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
    strategy: "absolute",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <Wrapper>
      <TextLogo height={20} width={100} />
      <Profile ref={refs.setReference} {...getReferenceProps()} />

      {isOpen && (
        <DropdownMenu
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <DropDownItemsWrapper>
            <AccountSection />
            <ProductNavItems />
          </DropDownItemsWrapper>
        </DropdownMenu>
      )}
    </Wrapper>
  );
}
