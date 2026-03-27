"use client";

import { Metadata } from "next";
import { useState } from "react";
import styled from "styled-components";
import "material-symbols";

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 0 5px;
`;

const TableSide = styled.div`
  height: 100%;
  width: 100%;

  @media only screen and (min-width: 992px) {
    width: 60%;
  }
`;

const PreviewSide = styled.div`
  border: var(--border);
  height: 100%;
  width: 40%;
  display: none;
  position: static;

  @media only screen and (min-width: 992px) {
    display: block;
  }
`;

const TableTabWrapper = styled.div`
  border: var(--border);
  display: flex;
  width: fit-content;
`;

const TabItem = styled.div`
  padding: 3px 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:not(:first-child) {
    border-left: var(--border);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
    font-weight: 430;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

// export const metadata: Metadata = {
//   title: "Inventory",
// };

export default function ProductLayout({
  children,
  stock,
  profit,
  rank,
}: {
  children: React.ReactNode;
  stock: React.ReactNode;
  profit: React.ReactNode;
  rank: React.ReactNode;
}) {
  const tabs = ["Stock", "Profit", "Rank"];
  const [activeTab, setActiveTab] = useState("Stock");
  return (
    <Wrapper>
      {/* {children} */}
      <TableSide>
        <TableTabWrapper>
          {tabs.map((item) => (
            <TabItem
              className={activeTab === item ? "active" : ""}
              onClick={() => {
                setActiveTab(item);
              }}
            >
              {item}
            </TabItem>
          ))}
        </TableTabWrapper>
        {activeTab === "Stock" ? (
          <TabContent>{stock}</TabContent>
        ) : activeTab === "Profit" ? (
          <TabContent>{profit}</TabContent>
        ) : activeTab === "Rank" ? (
          <TabContent>{rank}</TabContent>
        ) : null}
      </TableSide>
      <PreviewSide></PreviewSide>
    </Wrapper>
  );
}
