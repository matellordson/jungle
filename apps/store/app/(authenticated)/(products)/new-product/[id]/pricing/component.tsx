"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "material-symbols";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const GroupWrapper = styled.div`
  padding-top: 20px;

  &:first-child {
    padding-top: 0px;
  }
`;

const GroupName = styled.p`
  text-transform: uppercase;
  padding-bottom: 10px;
`;

const GroupItemWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const GroupItem = styled.div`
  padding: 5px 10px;
  border: var(--border);
  background-color: var(--background);
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
  width: fit-content;
`;

const GroupRow = styled.div`
  display: flex;
  gap: 20px;
  row-gap: 10px;
  flex-wrap: wrap;
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const LoadingVariant = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
`;

const NoVariant = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
`;

interface VariantsType {
  [group: string]: string[];
}

interface PricesType {
  [group: string]: {
    [value: string]: string;
  };
}

export function PricingComponent({ productId }: { productId: string }) {
  const [variants, setVariants] = useState<VariantsType>({});
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [prices, setPrices] = useState<PricesType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchVariants = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/variant`,
          { credentials: "include" },
        );
        const data = await res.json();
        console.log(data);

        const fetchedVariants: VariantsType = data.variant ?? {};
        setVariants(fetchedVariants);
        setGroupOrder(Object.keys(fetchedVariants));
      } catch (err) {
        console.error("Failed to fetch variants", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  const handlePriceChange = (group: string, value: string, price: string) => {
    setPrices((prev) => ({
      ...prev,
      [group]: {
        ...(prev[group] ?? {}),
        [value]: price,
      },
    }));
  };

  const isPriceInvalid = (group: string, value: string) =>
    !prices[group]?.[value]?.trim();

  const hasAnyMissingPrice = () =>
    groupOrder.some((group) =>
      (variants[group] ?? []).some((v) => isPriceInvalid(group, v)),
    );

  const handleDone = async () => {
    setSubmitted(true);

    if (hasAnyMissingPrice()) return;

    setIsPosting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantPrices: prices, published: true }),
      credentials: "include",
    });
    redirect("/inventory");
  };

  const hasVariants = groupOrder.length > 0;

  return (
    <Wrapper>
      <Heading>how will you price each variant?</Heading>
      <Main>
        <Card height="400px">
          {isLoading ? (
            <LoadingVariant>
              <Icon
                className="material-symbols-sharp"
                style={{ fontSize: "20px" }}
              >
                clock_loader_20
              </Icon>
              Loading variants
            </LoadingVariant>
          ) : !hasVariants ? (
            <NoVariant>
              <Icon
                className="material-symbols-sharp"
                style={{ fontSize: "20px" }}
              >
                error
              </Icon>
              No variants
            </NoVariant>
          ) : (
            groupOrder.map((group) => (
              <GroupWrapper key={group}>
                <GroupName>{group}</GroupName>
                <GroupRow>
                  {(variants[group] ?? []).map((v) => (
                    <GroupItemWrapper key={v}>
                      <GroupItem>{v}</GroupItem>
                      <Input
                        type="number"
                        name="prices"
                        height="33px"
                        width="80px"
                        value={prices[group]?.[v] ?? ""}
                        onChange={(e) =>
                          handlePriceChange(group, v, e.target.value)
                        }
                      />
                      {submitted && isPriceInvalid(group, v) && (
                        <Icon className="material-symbols-outlined">
                          asterisk
                        </Icon>
                      )}
                    </GroupItemWrapper>
                  ))}
                </GroupRow>
              </GroupWrapper>
            ))
          )}
        </Card>
      </Main>
      <Button
        variant="default"
        loading={isPosting}
        disabled={isPosting}
        onClick={handleDone}
        style={{
          marginTop: "30px",
        }}
      >
        submit
      </Button>
    </Wrapper>
  );
}
