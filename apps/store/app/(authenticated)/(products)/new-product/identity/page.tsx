"use client";
import styled from "styled-components";
import { FormEvent, useState } from "react";
import { Input } from "../../../../../components/input";
import { Button } from "../../../../../components/button";
import Logo from "../components/logo";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

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
  border: var(--border);
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
  transition: all 0.2s ease;
  user-select: none;

  &.active {
    background-color: var(--accent);
    color: var(--accent-bg-text);
  }
`;

export default function Identity() {
  const [productName, setProductName] = useState("");
  const [tagline, setTagline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const newProductId = uuidv4();

  const handleToggle = (val: string) => {
    setSelectedCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newProductId,
        store: "",
        name: productName,
        tagline: tagline,
        categories: selectedCategory,
      }),
      credentials: "include",
    });
    redirect(`/new-product/${newProductId}/media`);
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
  ];
  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>Let's add your product</StageTitle>
        <StageDesc>
          Your progress is saved as a draft until you publish.
        </StageDesc>
      </StageIntro>
      <Form onSubmit={handleSubmit}>
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
        <Button isPending={isPosting == true}>I'm ready</Button>
      </Form>
    </Wrapper>
  );
}
