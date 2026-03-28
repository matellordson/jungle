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

const Table = styled.div`
  height: 100%;
  width: 100%;
`;

const TableTabWrapper = styled.div`
  display: flex;
  width: fit-content;
  border: var(--border);
  background-color: var(--background);
`;

const TabItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:not(:first-child) {
    border-left: var(--border);
  }

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--foreground-text);
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
      <Table>
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
      </Table>
    </Wrapper>
  );
}
