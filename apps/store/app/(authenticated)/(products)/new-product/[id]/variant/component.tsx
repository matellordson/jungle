"use client";
import styled from "styled-components";
import { FormEvent, useState } from "react";
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

const VariantWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  border: var(--border);
  margin-bottom: 10px;
  background-color: var(--foreground);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyState = styled.div`
  font-size: 13px;
  color: var(--mute-text);
  text-align: center;
  padding: 10px 0px;
`;

const GroupBlock = styled.div<{ $isDraggingOver?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid
    ${({ $isDraggingOver }) =>
      $isDraggingOver ? "var(--primary, #6366f1)" : "transparent"};
  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? "var(--primary-subtle, #f0f0ff)" : "transparent"};
  transition: all 0.15s ease;
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

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 2px 4px;
  cursor: pointer;
  color: var(--mute-text);
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    color: #ef4444;
    background-color: #fef2f2;
  }
`;

const DragHandle = styled.button`
  background: none;
  border: none;
  padding: 2px 4px;
  cursor: grab;
  color: var(--mute-text);
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    color: var(--text-dark);
    background-color: var(--foreground);
  }
`;

const VariantItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const VariantItem = styled.div`
  padding: 4px 6px 4px 10px;
  font-size: 13px;
  border-radius: 4px;
  border: var(--border);
  color: var(--mute-text);
  background-color: var(--background);
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
`;

const VariantItemText = styled.span`
  line-height: 1;
`;

const VariantDeleteBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--mute-text);
  display: flex;
  align-items: center;
  border-radius: 2px;
  line-height: 1;
  transition: all 0.15s ease;

  &:hover {
    color: #ef4444;
  }
`;

interface VariantsType {
  [group: string]: string[];
}

export default function VariantComponent({ productId }: { productId: string }) {
  const [groupName, setGroupName] = useState("");
  const [variantValue, setVariantValue] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [variants, setVariants] = useState<VariantsType>({});
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [draggingGroup, setDraggingGroup] = useState<string | null>(null);
  const [dragOverGroup, setDragOverGroup] = useState<string | null>(null);

  const handleAddVariant = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!groupName.trim() || !variantValue.trim()) return;

    const key = groupName.trim();

    setVariants((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), variantValue.trim()],
    }));

    if (!groupOrder.includes(key)) {
      setGroupOrder((prev) => [...prev, key]);
    }

    setVariantValue("");
  };

  const handleDeleteValue = (group: string, value: string) => {
    setVariants((prev) => {
      const existing = prev[group] ?? [];
      const filtered = existing.filter((v) => v !== value);

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

  const handleDragStart = (group: string) => {
    setDraggingGroup(group);
  };

  const handleDragOver = (e: React.DragEvent, group: string) => {
    e.preventDefault();
    if (group !== draggingGroup) setDragOverGroup(group);
  };

  const handleDrop = (targetGroup: string) => {
    if (!draggingGroup || draggingGroup === targetGroup) return;

    setGroupOrder((prev) => {
      const updated = [...prev];
      const fromIdx = updated.indexOf(draggingGroup);
      const toIdx = updated.indexOf(targetGroup);
      updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, draggingGroup);
      return updated;
    });

    setDraggingGroup(null);
    setDragOverGroup(null);
  };

  const handleDragEnd = () => {
    setDraggingGroup(null);
    setDragOverGroup(null);
  };

  const handleDone = async () => {
    setIsPosting(true);
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
      <StageIntro>
        <StageTitle>Does it have variants?</StageTitle>
        <StageDesc>Does it come in different options.</StageDesc>
      </StageIntro>

      <VariantWrapper>
        {!hasVariants ? (
          <EmptyState>No variants added yet.</EmptyState>
        ) : (
          groupOrder.map((group) => (
            <GroupBlock
              key={group}
              draggable
              $isDraggingOver={dragOverGroup === group}
              onDragStart={() => handleDragStart(group)}
              onDragOver={(e) => handleDragOver(e, group)}
              onDrop={() => handleDrop(group)}
              onDragEnd={handleDragEnd}
            >
              <GroupHeader>
                <DragHandle
                  title="Drag to reorder"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <circle cx="4" cy="3" r="1.2" />
                    <circle cx="8" cy="3" r="1.2" />
                    <circle cx="4" cy="6" r="1.2" />
                    <circle cx="8" cy="6" r="1.2" />
                    <circle cx="4" cy="9" r="1.2" />
                    <circle cx="8" cy="9" r="1.2" />
                  </svg>
                </DragHandle>
                <GroupLabel>{group}</GroupLabel>
                <GroupDivider />
                <IconButton
                  title={`Delete ${group} group`}
                  onClick={() => handleDeleteGroup(group)}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </IconButton>
              </GroupHeader>
              <VariantItems>
                {(variants[group] ?? []).map((v) => (
                  <VariantItem key={v}>
                    <VariantItemText>{v}</VariantItemText>
                    <VariantDeleteBtn
                      title={`Remove ${v}`}
                      onClick={() => handleDeleteValue(group, v)}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </VariantDeleteBtn>
                  </VariantItem>
                ))}
              </VariantItems>
            </GroupBlock>
          ))
        )}
      </VariantWrapper>

      <Form onSubmit={handleAddVariant}>
        <FormItem>
          <Input
            name="group"
            placeholder="Group name (e.g. Size, Color)"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Input
            name="value"
            placeholder="Variant value (e.g. Red, XL)"
            value={variantValue}
            onChange={(e) => setVariantValue(e.target.value)}
          />
        </FormItem>
        <Button isPending={false}>Add variant</Button>
      </Form>

      <Button isPending={isPosting} onClick={handleDone}>
        All done
      </Button>
    </Wrapper>
  );
}
