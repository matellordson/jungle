"use client";

import styled from "styled-components";
import "material-symbols";
import { useState } from "react";
import Image from "next/image";
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react";
import { product } from "../product";

const Wrapper = styled.div`
  width: 100%;
`;

const PageName = styled.p`
  text-transform: uppercase;
  font-weight: 500;
  padding-bottom: 20px;
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
  position: fixed;
  top: 0;
  left: 0;
  border: var(--border);
  background-color: var(--menu-bg);
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

const FilterCount = styled.p`
  font-size: 0.85rem;
  color: var(--paragraph-color);
  margin-top: 8px;
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

const StockName = styled.p`
  cursor: pointer;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }
`;

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

const StockItemMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  border: var(--border);
  background-color: var(--menu-bg);
  z-index: 9999;
  min-width: 200px;
`;

const StockItemMenuImage = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
  border-bottom: var(--border);
  overflow: hidden;
`;

const StockItemMenuItem = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: var(--highlight);
  }
`;

type StockStatus = "low" | "ok" | "high" | "";

const FILTER_OPTIONS: { label: string; value: StockStatus; color: string }[] = [
  { label: "Low stock", value: "low", color: "var(--red-bg)" },
  { label: "OK stock", value: "ok", color: "var(--yellow-bg)" },
  { label: "High stock", value: "high", color: "var(--green-bg)" },
];

const ITEMS_PER_PAGE = 10;

const bodyShift = {
  name: "bodyShift",
  fn({ x, y }: { x: number; y: number }) {
    const bodyLeft = document.body.getBoundingClientRect().left;
    return { x: x + bodyLeft, y };
  },
};

type Product = (typeof product)[number];

function StockRow({ item }: { item: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  const stock = item.stocks[0];

  if (!stock) return null;

  const getStockBg = () => {
    if (stock.current <= stock.low_count) return "var(--red-bg)";
    if (stock.current <= stock.high_count && stock.current >= stock.low_count)
      return "var(--yellow-bg)";
    return "var(--green-bg)";
  };

  const getStockTextColor = () => {
    if (stock.current <= stock.low_count) return "var(--red-text)";
    if (stock.current <= stock.high_count && stock.current >= stock.low_count)
      return "var(--yellow-text)";
    return "var(--green-text)";
  };

  const getStockLabel = () => {
    if (stock.current <= stock.low_count) return "Low stock";
    if (stock.current <= stock.high_count && stock.current >= stock.low_count)
      return "OK stock";
    return "High stock";
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), bodyShift],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "fixed",
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <StockItem>
      <StockName ref={refs.setReference} {...getReferenceProps()}>
        {item.name}
      </StockName>

      {isOpen && (
        <FloatingPortal>
          <StockItemMenu
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <StockItemMenuImage>
              <Image
                src={item.image_url[0] ?? ""}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
              ```
            </StockItemMenuImage>

            <StockItemMenuItem onClick={() => console.log("View", item.name)}>
              <span
                className="material-symbols-sharp"
                style={{ fontSize: "16px" }}
              >
                visibility
              </span>
              View details
            </StockItemMenuItem>
            <StockItemMenuItem onClick={() => console.log("Edit", item.name)}>
              <span
                className="material-symbols-sharp"
                style={{ fontSize: "16px" }}
              >
                edit
              </span>
              Edit product
            </StockItemMenuItem>
            <StockItemMenuItem
              onClick={() => console.log("Restock", item.name)}
            >
              <span
                className="material-symbols-sharp"
                style={{ fontSize: "16px" }}
              >
                add_circle
              </span>
              Restock
            </StockItemMenuItem>
            <StockItemMenuItem
              onClick={() => console.log("History", item.name)}
            >
              <span
                className="material-symbols-sharp"
                style={{ fontSize: "16px" }}
              >
                history
              </span>
              Stock history
            </StockItemMenuItem>
          </StockItemMenu>
        </FloatingPortal>
      )}

      <StockCountWrapper>
        <StockCount>{stock.current}</StockCount>
        <StockColor style={{ backgroundColor: getStockBg() }} />
      </StockCountWrapper>
    </StockItem>
  );
}

export default function Stocks() {
  const [activeSort, setActiveSort] = useState("asc");
  const [activeFilter, setActiveFilter] = useState<StockStatus>("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), bodyShift],
    whileElementsMounted: autoUpdate,
    placement: "bottom-start",
    strategy: "fixed",
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
    const stock = item.stocks[0];
    if (!stock) return "";
    if (stock.current <= stock.low_count) return "low";
    if (stock.current <= stock.high_count && stock.current >= stock.low_count)
      return "ok";
    if (stock.current >= stock.high_count) return "high";
    return "";
  };

  const filteredProducts = activeFilter
    ? product.filter((item) => getStockStatus(item) === activeFilter)
    : product;

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    activeSort === "asc"
      ? (a.stocks[0]?.current ?? 0) - (b.stocks[0]?.current ?? 0)
      : (b.stocks[0]?.current ?? 0) - (a.stocks[0]?.current ?? 0),
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
      <PageName>Remaining Stocks</PageName>
      <Action>
        <FilterWrapper
          ref={refs.setReference}
          className={activeFilter ? "active" : ""}
          {...getReferenceProps()}
        >
          <span className="material-symbols-sharp" style={{ fontSize: "16px" }}>
            filter_list
          </span>
          {activeFilterLabel ?? "filter"}
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
          <FloatingPortal>
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
          </FloatingPortal>
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
                style={{ fontSize: "18px" }}
              >
                {item.icon}
              </span>
            </SortItem>
          ))}
        </SortWrapper>
      </Action>

      {activeFilter && (
        <FilterCount>
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} — {activeFilterLabel}
        </FilterCount>
      )}

      <StockWrapper>
        {paginatedProducts.length === 0 ? (
          <StockItem>
            <StockName>No products found</StockName>
          </StockItem>
        ) : (
          paginatedProducts.map((item) => (
            <StockRow key={item.name} item={item} />
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
