"use client";

import { useState } from "react";
import styled from "styled-components";
import "material-symbols";

const Wrapper = styled.div`
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
  padding: 5px;
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
  /* max-height: 700px; */
  overflow-y: auto;
`;

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
      <Table>
        <TableTabWrapper>
          {tabs.map((item) => (
            <TabItem
              key={item}
              className={activeTab === item ? "active" : ""}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </TabItem>
          ))}
        </TableTabWrapper>

        <TabContent>
          {activeTab === "Stock" && stock}
          {activeTab === "Profit" && profit}
          {activeTab === "Rank" && rank}
        </TabContent>
      </Table>
    </Wrapper>
  );
}
