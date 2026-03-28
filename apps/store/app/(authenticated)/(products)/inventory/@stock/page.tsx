"use client";

import styled from "styled-components";
import "material-symbols";
import { useState } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  autoUpdate,
} from "@floating-ui/react";
import { product } from "../product";

const Wrapper = styled.div`
  width: 100%;
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const FilterWrapper = styled.div`
  border: var(--border);
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
  width: fit-content;

  &:hover {
    background-color: var(--highlight);
    cursor: pointer;
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border: var(--border);
  background-color: var(--background);
  z-index: 9999;
  min-width: 160px;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const StatusDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border: var(--border);
  background-color: ${({ color }) => color};
  flex-shrink: 0;
`;

const SortWrapper = styled.div`
  border: var(--border);
  display: flex;
  width: fit-content;
  padding: 5px;
`;

const SortItem = styled.div`
  width: fit-content;
  padding: 3px 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);

  &:hover {
    background-color: var(--highlight);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--background);
  }
`;

const StockWrapper = styled.div`
  margin-top: 10px;
`;

const StockItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  &:hover {
    background-color: var(--highlight);
  }
`;

const StockName = styled.p``;

const StockCountWrapper = styled.div`
  display: flex;
`;

const StockCount = styled.div`
  border: var(--border);
  padding: 3px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StockColor = styled.div`
  height: 30px;
  width: 15px;
  border-right: var(--border);
  border-top: var(--border);
  border-bottom: var(--border);
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border-top: var(--border);
  padding: 10px 0;
`;

const PaginationButton = styled.div`
  border: var(--border);
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background-color: var(--highlight);
  }

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const PaginationInfo = styled.p`
  font-size: 0.85rem;
  color: var(--paragraph-color);
`;

type StockStatus = "low" | "ok" | "high" | "";

const FILTER_OPTIONS: { label: string; value: StockStatus; color: string }[] = [
  { label: "Low stock", value: "low", color: "var(--red-bg)" },
  { label: "OK stock", value: "ok", color: "var(--yellow-bg)" },
  { label: "High stock", value: "high", color: "var(--green-bg)" },
];

const ITEMS_PER_PAGE = 10;

export default function Stocks() {
  const [activeSort, setActiveSort] = useState("asc");
  const [activeFilter, setActiveFilter] = useState<StockStatus>("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip()],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "absolute",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const Sorts = [
    { name: "asc", icon: "arrow_upward" },
    { name: "desc", icon: "arrow_downward" },
  ];

  const getStockStatus = (item: (typeof product)[number]): StockStatus => {
    if (item.current_stock_count <= item.low_stock_count) return "low";
    if (
      item.current_stock_count <= item.high_stock_count &&
      item.current_stock_count >= item.low_stock_count
    )
      return "ok";
    if (item.current_stock_count >= item.high_stock_count) return "high";
    return "";
  };

  const filteredProducts = activeFilter
    ? product.filter((item) => getStockStatus(item) === activeFilter)
    : product;

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    activeSort === "asc"
      ? a.current_stock_count - b.current_stock_count
      : b.current_stock_count - a.current_stock_count,
  );

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilterLabel = FILTER_OPTIONS.find(
    (o) => o.value === activeFilter,
  )?.label;

  const handleFilterChange = (value: StockStatus) => {
    setActiveFilter(value);
    setCurrentPage(1);
    setIsOpen(false);
  };

  const handleSortChange = (name: string) => {
    setActiveSort(name);
    setCurrentPage(1);
  };

  return (
    <Wrapper>
      <Action>
        <FilterWrapper
          ref={refs.setReference}
          className={activeFilter ? "active" : ""}
          {...getReferenceProps()}
        >
          <span className="material-symbols-sharp" style={{ fontSize: "16px" }}>
            filter_list
          </span>
          {activeFilterLabel ?? "Filter"}
          {activeFilter && (
            <span
              className="material-symbols-sharp"
              style={{ fontSize: "14px", marginLeft: 2 }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter("");
                setCurrentPage(1);
              }}
            >
              close
            </span>
          )}
        </FilterWrapper>

        {isOpen && (
          <DropdownMenu
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {FILTER_OPTIONS.map((option) => (
              <DropdownItem
                key={option.value}
                className={activeFilter === option.value ? "active" : ""}
                onClick={() => handleFilterChange(option.value)}
              >
                <StatusDot color={option.color} />
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}

        <SortWrapper>
          {Sorts.map((item) => (
            <SortItem
              key={item.name}
              className={activeSort === item.name ? "active" : ""}
              onClick={() => handleSortChange(item.name)}
            >
              <span
                className="material-symbols-sharp"
                style={{ fontSize: "16px" }}
              >
                {item.icon}
              </span>
            </SortItem>
          ))}
        </SortWrapper>
      </Action>

      <StockWrapper>
        {paginatedProducts.length === 0 ? (
          <StockItem>
            <StockName>No products found</StockName>
          </StockItem>
        ) : (
          paginatedProducts.map((item) => (
            <StockItem key={item.name}>
              <StockName>{item.name}</StockName>
              <StockCountWrapper>
                <StockCount>{item.current_stock_count}</StockCount>
                <StockColor
                  style={{
                    backgroundColor:
                      item.current_stock_count <= item.low_stock_count
                        ? "var(--red-bg)"
                        : item.current_stock_count <= item.high_stock_count &&
                            item.current_stock_count >= item.low_stock_count
                          ? "var(--yellow-bg)"
                          : "var(--green-bg)",
                  }}
                />
              </StockCountWrapper>
            </StockItem>
          ))
        )}
      </StockWrapper>

      {totalPages > 1 && (
        <PaginationWrapper>
          <PaginationInfo>
            {currentPage} / {totalPages}
          </PaginationInfo>
          <PaginationButton
            className={currentPage === 1 ? "disabled" : ""}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <span
              className="material-symbols-sharp"
              style={{ fontSize: "16px" }}
            >
              arrow_back
            </span>
            prev
          </PaginationButton>
          <PaginationButton
            className={currentPage === totalPages ? "disabled" : ""}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            next
            <span
              className="material-symbols-sharp"
              style={{ fontSize: "16px" }}
            >
              arrow_forward
            </span>
          </PaginationButton>
        </PaginationWrapper>
      )}
    </Wrapper>
  );
}
