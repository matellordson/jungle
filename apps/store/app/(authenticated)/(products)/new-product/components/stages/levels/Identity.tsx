"use client";
import styled from "styled-components";
import { Input } from "../../../../../../../components/input";
import Logo from "../../logo";
import { Button } from "../../../../../../../components/button";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  padding: 0px 3px;
  max-width: 500px;
  margin: auto;
`;

const StageIntro = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const StageTitle = styled.div`
  font-size: 30px;
  color: var(--text-dark);
  display: flex;
  align-items: start;
  gap: 10px;
  justify-content: center;
`;

const StageDesc = styled.p`
  font-size: 14px;
  padding-top: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CategoryWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  border: var(--border, 1px solid #ccc);
`;

const CategoryItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryItem = styled.div`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: var(--border);
  cursor: pointer;
  color: var(--mute-text);
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover {
    background-color: var(--foreground);
    color: var(--text-light);
  }

  &.active {
    background-color: var(--foreground);
    color: var(--text-light);
  }
`;

export function Identity() {
  const [productName, setProductName] = useState("");
  const [tagline, setTagline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleToggle = (val: string) => {
    setSelectedCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  const category = [
    { value: "womens-clothing", label: "Women's Clothing" },
    { value: "mens-clothing", label: "Men's Clothing" },
    { value: "kids-clothing", label: "Kids & Baby" },
    { value: "shoes-footwear", label: "Shoes & Footwear" },
    { value: "bags-handbags", label: "Bags & Handbags" },
    { value: "jewellery", label: "Jewellery" },
    { value: "watches", label: "Watches" },
    { value: "sunglasses-eyewear", label: "Sunglasses & Eyewear" },
    { value: "activewear", label: "Activewear" },
    { value: "swimwear", label: "Swimwear" },
    { value: "outerwear", label: "Outerwear & Coats" },
    { value: "lingerie-underwear", label: "Lingerie & Underwear" },
    { value: "socks-hosiery", label: "Socks & Hosiery" },
    { value: "hats-caps", label: "Hats & Caps" },
    { value: "scarves-belts", label: "Scarves & Belts" },
  ];
  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>
          <Logo />
          Let's add your product
        </StageTitle>
        <StageDesc>
          You can save your progress and come back at any point.
        </StageDesc>
      </StageIntro>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log({
            productName: productName,
            tagline: tagline,
            category: selectedCategory,
          });
        }}
      >
        <FormItem>
          <Input
            placeholder="Untitled product"
            name="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Input
            placeholder="Product tagline"
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <CategoryWrapper>
            <CategoryItems>
              {category.map((item) => {
                const isActive = selectedCategory.includes(item.value);
                return (
                  <CategoryItem
                    key={item.value}
                    className={isActive ? "active" : ""}
                    onClick={() => handleToggle(item.value)}
                  >
                    {item.label}
                  </CategoryItem>
                );
              })}
            </CategoryItems>
          </CategoryWrapper>
        </FormItem>
        <Button>I'm ready</Button>
      </Form>
    </Wrapper>
  );
}
