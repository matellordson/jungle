"use client";

import styled from "styled-components";
import { useState, FormEvent } from "react";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Button } from "@repo/ui/button";
import "material-symbols";
import { redirect } from "next/navigation";

const Wrapper = styled.div`
  padding: 0 5px;
`;

const Heading = styled.p`
  text-transform: uppercase;
  font-weight: 500;

  @media only screen and (min-width: 992px) {
    text-align: center;
  }
`;

const Main = styled.div`
  margin-top: 50px;
  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const VariantWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  gap: 30px;
  flex-direction: column;

  @media only screen and (min-width: 992px) {
    flex-direction: row;
  }
`;

const ProductVariantWrapper = styled.div`
  width: 100%;
`;

const ProductVariants = styled.div`
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
  font-size: 15px;
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

const EmptyState = styled.div`
  font-size: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GroupBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

const GroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
`;

const GroupLabel = styled.div`
  text-transform: uppercase;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 2px 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: all 0.15s ease;
  flex-shrink: 0;
`;

const VariantItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const VariantItem = styled.div`
  padding: 5px 10px;
  border: var(--border);
  background-color: var(--background);
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
`;

interface VariantsType {
  [group: string]: string[];
}

export function VariantComponent({ productId }: { productId: string }) {
  const [groupName, setGroupName] = useState("");
  const [variantValue, setVariantValue] = useState("");
  const [variants, setVariants] = useState<VariantsType>({});
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addSubmitted, setAddSubmitted] = useState(false);

  const groupNameError = !groupName.trim() ? "Required" : null;
  const variantValueError = !variantValue.trim() ? "Required" : null;

  const handleAddVariant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddSubmitted(true);
    if (groupNameError || variantValueError) return;

    const key = groupName.trim();

    setVariants((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), variantValue.trim()],
    }));

    if (!groupOrder.includes(key)) {
      setGroupOrder((prev) => [...prev, key]);
    }

    setVariantValue("");
    setAddSubmitted(false);
  };

  const handleDeleteValue = (group: string, value: string) => {
    setVariants((prev) => {
      const filtered = (prev[group] ?? []).filter((v) => v !== value);
      const updated = { ...prev, [group]: filtered };
      if (filtered.length === 0) {
        delete updated[group];
        setGroupOrder((prev) => prev.filter((g) => g !== group));
      }
      return updated;
    });
  };

  const handleDeleteGroup = (group: string) => {
    setVariants((prev) => {
      const updated = { ...prev };
      delete updated[group];
      return updated;
    });
    setGroupOrder((prev) => prev.filter((g) => g !== group));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variant: variants }),
      credentials: "include",
    });
    redirect(`/new-product/${productId}/pricing`);
  };

  const hasVariants = groupOrder.length > 0;

  return (
    <Wrapper>
      <Heading>Does this product have variant?</Heading>
      <Main>
        <ButtonWrapper>
          <Button
            type="button"
            variant="outline"
            onClick={() => redirect(`/new-product/${productId}/pricing`)}
            disabled={isLoading}
          >
            skip
          </Button>
          <Form onSubmit={handleSubmit}>
            <Button
              variant="default"
              type="submit"
              disabled={isLoading || !hasVariants}
              loading={isLoading}
            >
              Submit
            </Button>
          </Form>
        </ButtonWrapper>

        <VariantWrapper>
          <ProductVariantWrapper>
            <FormItem>
              <LabelRow>
                <Label>Current Variants</Label>
              </LabelRow>
              <Card height="250px">
                <GroupBlockWrapper>
                  {!hasVariants ? (
                    <EmptyState>No variants</EmptyState>
                  ) : (
                    groupOrder.map((group) => (
                      <GroupBlock key={group}>
                        <GroupHeader>
                          <GroupLabel>{group}</GroupLabel>
                          <IconButton
                            title={`Delete ${group} group`}
                            onClick={() => handleDeleteGroup(group)}
                          >
                            <span className="material-symbols-sharp">
                              remove
                            </span>
                          </IconButton>
                        </GroupHeader>
                        <VariantItems>
                          {(variants[group] ?? []).map((v) => (
                            <VariantItem
                              key={v}
                              onClick={() => {
                                if (isLoading) {
                                  return;
                                } else {
                                  handleDeleteValue(group, v);
                                }
                              }}
                            >
                              {v}
                            </VariantItem>
                          ))}
                        </VariantItems>
                      </GroupBlock>
                    ))
                  )}
                </GroupBlockWrapper>
              </Card>
            </FormItem>
          </ProductVariantWrapper>

          <ProductVariants>
            <Form onSubmit={handleAddVariant}>
              <FormItem>
                <LabelRow>
                  <Label htmlFor="groupName">Group</Label>
                  {addSubmitted && groupNameError && (
                    <Icon className="material-symbols-outlined">asterisk</Icon>
                  )}
                </LabelRow>
                <Input
                  id="groupName"
                  placeholder="e.g. Size, Color"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  disabled={isLoading}
                />
              </FormItem>
              <FormItem>
                <LabelRow>
                  <Label htmlFor="variantValue">Value</Label>
                  {addSubmitted && variantValueError && (
                    <Icon className="material-symbols-outlined">asterisk</Icon>
                  )}
                </LabelRow>
                <Input
                  id="variantValue"
                  placeholder="e.g. Red, XL"
                  value={variantValue}
                  onChange={(e) => setVariantValue(e.target.value)}
                  disabled={isLoading}
                />
              </FormItem>
              <Button variant="outline" type="submit" disabled={isLoading}>
                Add variant
              </Button>
            </Form>
          </ProductVariants>
        </VariantWrapper>
      </Main>
    </Wrapper>
  );
}
