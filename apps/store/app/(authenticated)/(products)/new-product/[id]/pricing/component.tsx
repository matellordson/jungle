"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Input } from "../../../../../../components/input";
import { Button } from "../../../../../../components/button";

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

const GroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: var(--mute-text);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
`;

const GroupDivider = styled.div`
  flex: 1;
  height: 1px;
  background-color: var(--border-color, #e5e7eb);
`;

const VariantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VariantLabel = styled.div`
  font-size: 13px;
  color: var(--text-dark);
  min-width: 80px;
  flex-shrink: 0;
  padding: 6px 10px;
  border-radius: 4px;
  border: var(--border);
  background-color: var(--foreground);
`;

const PricePrefix = styled.span`
  font-size: 13px;
  color: var(--mute-text);
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  font-size: 13px;
  color: var(--mute-text);
  text-align: center;
  padding: 30px 0px;
  border: var(--border);
  border-radius: 5px;
  background-color: var(--foreground);
`;

const LoadingState = styled.div`
  font-size: 13px;
  color: var(--mute-text);
  text-align: center;
  padding: 30px 0px;
`;

interface VariantsType {
  [group: string]: string[];
}

interface PricesType {
  [group: string]: {
    [value: string]: string;
  };
}

export default function VariantPricingComponent({
  productId,
}: {
  productId: string;
}) {
  const [variants, setVariants] = useState<VariantsType>({});
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [prices, setPrices] = useState<PricesType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

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

  const handleDone = async () => {
    setIsPosting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantPrices: prices }),
      credentials: "include",
    });
    redirect(`/products`);
  };

  const hasVariants = groupOrder.length > 0;

  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>Set variant prices</StageTitle>
        <StageDesc>Add a price for each variant option.</StageDesc>
      </StageIntro>

      {isLoading ? (
        <LoadingState>Loading variants...</LoadingState>
      ) : !hasVariants ? (
        <EmptyState>No variants found for this product.</EmptyState>
      ) : (
        groupOrder.map((group) => (
          <GroupBlock key={group}>
            <GroupHeader>
              <GroupLabel>{group}</GroupLabel>
              <GroupDivider />
            </GroupHeader>
            {(variants[group] ?? []).map((v) => (
              <VariantRow key={v}>
                <VariantLabel>{v}</VariantLabel>
                <PricePrefix>$</PricePrefix>
                <Input
                  type="number"
                  name="prices"
                  // min="0"
                  // step="0.01"
                  placeholder="0.00"
                  value={prices[group]?.[v] ?? ""}
                  onChange={(e) => handlePriceChange(group, v, e.target.value)}
                />
              </VariantRow>
            ))}
          </GroupBlock>
        ))
      )}

      <Button isPending={isPosting} onClick={handleDone}>
        All done
      </Button>
    </Wrapper>
  );
}
