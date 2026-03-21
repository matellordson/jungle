"use client";

import styled from "styled-components";
import { useState } from "react";
import { ProductList } from "./ProductList";
import ProductGrid from "./ProductGrid";

const Wrapper = styled.div``;

const ProductWrapper = styled.div``;

interface ProductsProps {
  view: "list" | "details";
}

export function Products({ view }: ProductsProps) {
  return (
    <Wrapper>
      <ProductWrapper>
        {view === "list" ? "List view" : "Grid View"}
      </ProductWrapper>
    </Wrapper>
  );
}
