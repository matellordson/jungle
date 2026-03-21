"use client";

import styled from "styled-components";
import { useState } from "react";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Button } from "@repo/ui/button";
import "material-symbols";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

const Wrapper = styled.div`
  padding: 0 5px;
`;

const Heading = styled.p`
  text-transform: uppercase;

  @media only screen and (min-width: 992px) {
    text-align: center;
  }
`;

const Main = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const ProductCategoryWrapper = styled.div`
  width: 100%;
`;

const ProductIdentityWrapper = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Category = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CheckBox = styled.div`
  height: 20px;
  width: 20px;
  background-color: var(--background);
  border: var(--border);
  cursor: pointer;

  &.active {
    background-color: var(--accent);
  }
`;

export default function IdentityPage() {
  const [productName, setProductName] = useState("");
  const [productTagline, setProductTagline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = (val: string) => {
    setSelectedCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );
  };

  const clothingCategory = [
    { value: "sneakers", label: "Sneakers" },
    { value: "boots", label: "Boots" },
    { value: "sandals", label: "Sandals" },
    { value: "loafers", label: "Loafers" },
    { value: "heels", label: "Heels" },
    { value: "flats", label: "Flats" },
    { value: "oxfords", label: "Oxfords" },
    { value: "slippers", label: "Slippers" },
    { value: "athletic-shoes", label: "Athletic Shoes" },
    { value: "mules", label: "Mules" },
    { value: "wedges", label: "Wedges" },
    { value: "ankle-boots", label: "Ankle Boots" },
    { value: "knee-high-boots", label: "Knee High Boots" },
    { value: "platforms", label: "Platforms" },
    { value: "flip-flops", label: "Flip Flops" },
    { value: "espadrilles", label: "Espadrilles" },
  ];

  const newProductId = uuidv4();

  const categoryError = selectedCategory.length === 0 ? "Required" : null;

  const nameError = !productName.trim()
    ? "Required"
    : productName.length > 50
      ? "Product name must not exceed 50 characters"
      : null;

  const taglineError = !productTagline.trim()
    ? "Required"
    : productTagline.length > 100
      ? "Tagline must not exceed 100 characters"
      : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (categoryError || nameError || taglineError) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newProductId,
        store: "",
        name: productName,
        tagline: productTagline,
        categories: selectedCategory,
      }),
      credentials: "include",
    });
    redirect(`/new-product/${newProductId}/media`);
  };

  return (
    <Wrapper>
      <Heading>How do you want this product to be identified?</Heading>
      <Main>
        <ProductCategoryWrapper>
          <FormItem>
            <LabelRow>
              <Label>product category</Label>
              {submitted && categoryError && (
                <Icon className="material-symbols-outlined">asterisk</Icon>
              )}
            </LabelRow>
            <Card height="250px">
              <Category>
                {clothingCategory.map((item) => {
                  const isActive = selectedCategory.includes(item.value);
                  return (
                    <CategoryItem key={item.value}>
                      <CheckBox
                        className={isActive ? "active" : ""}
                        onClick={() => handleToggle(item.value)}
                      />
                      {item.label}
                    </CategoryItem>
                  );
                })}
              </Category>
            </Card>
          </FormItem>
        </ProductCategoryWrapper>
        <ProductIdentityWrapper>
          <Form onSubmit={handleSubmit}>
            <FormItem>
              <LabelRow>
                <Label htmlFor="productName">product name</Label>
                {submitted && nameError && (
                  <Icon className="material-symbols-outlined">
                    {productName.length > 50 ? "block" : "asterisk"}
                  </Icon>
                )}
              </LabelRow>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FormItem>

            <FormItem>
              <LabelRow>
                <Label htmlFor="productTagline">product tagline</Label>
                {submitted && taglineError && (
                  <Icon className="material-symbols-outlined">
                    {productTagline.length > 100 ? "block" : "asterisk"}
                  </Icon>
                )}
              </LabelRow>
              <Input
                id="productTagline"
                value={productTagline}
                onChange={(e) => setProductTagline(e.target.value)}
              />
            </FormItem>

            <Button
              type="submit"
              disabled={
                categoryError || nameError || taglineError ? true : false
              }
              loading={submitted}
            >
              submit
            </Button>
          </Form>
        </ProductIdentityWrapper>
      </Main>
    </Wrapper>
  );
}
