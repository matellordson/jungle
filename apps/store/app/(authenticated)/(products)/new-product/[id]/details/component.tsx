"use client";
import styled, { css, keyframes } from "styled-components";
import { FormEvent, useState, useRef, useCallback } from "react";
import { Button } from "../../../../../../components/button";
import Logo from "../../components/logo";
import { FileText, X, GripVertical } from "lucide-react";
import { redirect } from "next/navigation";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); }`;

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

const UploadBox = styled.div<{ $isDragging?: boolean }>`
  height: 150px;
  width: 100%;
  border: 1px dashed
    ${({ $isDragging }) => ($isDragging ? "var(--accent)" : "var(--border-bg)")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  transition: border-color 0.2s ease-in-out;
`;

const UploadBoxTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & p {
    color: var(--text-dark);
  }
`;

const UploadBoxPara = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  font-size: 14px;

  & button {
    background-color: transparent;
    border: none;
    color: var(--accent);
    font: inherit;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const UploadBoxHint = styled.p`
  font-size: 12px;
  color: var(--text-muted);
  margin: 0;
`;

const GalleryBox = styled.div`
  width: 100%;
  border: var(--border);
  border-radius: 5px;
  background-color: var(--foreground);
  padding: 10px;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-bg);
    border-radius: 10px;
  }
`;

const GalleryItems = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: nowrap;
`;

const GalleryItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
`;

const FileName = styled.p`
  font-size: 10px;
  color: var(--text-muted);
  width: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const GalleryItem = styled.div<{
  $isDragOver?: boolean;
  $isDragging?: boolean;
}>`
  height: 80px;
  width: 80px;
  background-color: var(--background);
  border: var(--border);
  border-radius: 5px;
  position: relative;
  flex-shrink: 0;
  cursor: grab;
  animation: ${fadeIn} 0.2s ease;
  transition:
    opacity 0.15s,
    transform 0.15s,
    box-shadow 0.15s;
  user-select: none;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0.35;
      transform: scale(0.95);
    `}

  ${({ $isDragOver }) =>
    $isDragOver &&
    css`
      box-shadow: -3px 0 0 0 var(--accent);
      transform: translateX(3px);
    `}

  &:active {
    cursor: grabbing;
  }
`;

const DragHandle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
  border-radius: 0 0 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;

  ${GalleryItem}:hover & {
    opacity: 1;
  }

  & svg {
    color: white;
  }
`;

const PdfThumb = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: var(--foreground);
  color: var(--text-muted);
  pointer-events: none;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transform: scale(0.7);
  transition:
    opacity 0.15s,
    transform 0.15s,
    background 0.15s,
    color 0.15s;
  z-index: 10;

  svg {
    pointer-events: none;
    color: white;
  }

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1);
  }
`;

const ErrorList = styled.ul`
  margin: 0;
  padding: 6px 10px;
  background-color: var(--red-bg);
  border-radius: 5px;
  font-size: 13px;
  color: var(--red-bg-text);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

interface UploadedFile {
  id: string;
  file: File;
}

const ACCEPTED_PDF_TYPES = ["application/pdf"];
const MAX_PDF_SIZE_MB = 50;

export default function DetailsComponent({ productId }: { productId: string }) {
  const [isPosting, setIsPosting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newErrors: string[] = [];
    const newFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const isPdf = ACCEPTED_PDF_TYPES.includes(file.type);

      if (!isPdf) {
        newErrors.push(`"${file.name}" is not a supported type.`);
        continue;
      }

      if (file.size > MAX_PDF_SIZE_MB * 1024 * 1024) {
        newErrors.push(`"${file.name}" exceeds ${MAX_PDF_SIZE_MB}MB.`);
        continue;
      }

      newFiles.push({
        id: crypto.randomUUID(),
        file,
      });
    }

    setErrors(newErrors);
    if (newFiles.length > 0) setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onItemDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = "move";
    const ghost = document.createElement("div");
    ghost.style.position = "absolute";
    ghost.style.top = "-9999px";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const onItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndexRef.current === null || dragIndexRef.current === index) return;
    setDragOverIndex(index);
  };

  const onItemDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === dropIndex) return;

    setUploadedFiles((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      if (moved === undefined) return prev;
      updated.splice(dropIndex, 0, moved);
      return updated;
    });

    dragIndexRef.current = null;
    setDragOverIndex(null);
    setDraggingIndex(null);
  };

  const onItemDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
    setDraggingIndex(null);
  };

  const onItemTouchStart = (e: React.TouchEvent, index: number) => {
    dragIndexRef.current = index;
    setDraggingIndex(index);
    const touch = e.touches[0]!;
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const onItemTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0]!;
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const item = el?.closest("[data-gallery-index]");
    if (item) {
      const overIndex = Number(item.getAttribute("data-gallery-index"));
      if (overIndex !== dragIndexRef.current) setDragOverIndex(overIndex);
    }
  };

  const onItemTouchEnd = () => {
    if (dragIndexRef.current !== null && dragOverIndex !== null) {
      const fromIndex = dragIndexRef.current;
      const toIndex = dragOverIndex;
      setUploadedFiles((prev) => {
        const updated = [...prev];
        const [moved] = updated.splice(fromIndex, 1);
        if (moved === undefined) return prev;
        updated.splice(toIndex, 0, moved);
        return updated;
      });
    }
    dragIndexRef.current = null;
    setDragOverIndex(null);
    setDraggingIndex(null);
    touchStartPos.current = null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);

    const orderedUrls: string[] = [];

    for (const { file } of uploadedFiles) {
      const formData = new FormData();
      formData.append("network", "public");
      formData.append("file", file);

      const res = await fetch("https://uploads.pinata.cloud/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      });

      const data = await res.json();
      const cid = data.data.cid;
      orderedUrls.push(
        `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`,
      );
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ details: orderedUrls }),
    });

    redirect(`/new-product/${productId}/variant`);
  };

  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>Details & Attributes</StageTitle>
        <StageDesc>What exactly is it made of and how does it work?</StageDesc>
      </StageIntro>
      <Form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <UploadBox
          $isDragging={isDragging}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <UploadBoxTitle>
            <FileText size={18} />
            <p>PDF</p>
          </UploadBoxTitle>
          <UploadBoxPara>
            <p>
              Drag and drop your files here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                click to select
              </button>
              .
            </p>
            <UploadBoxHint>PDF — max {MAX_PDF_SIZE_MB}MB</UploadBoxHint>
          </UploadBoxPara>
        </UploadBox>

        {errors.length > 0 && (
          <ErrorList>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ErrorList>
        )}

        {uploadedFiles.length > 0 && (
          <GalleryBox>
            <GalleryItems>
              {uploadedFiles.map(({ id, file }, index) => (
                <GalleryItemWrapper key={id}>
                  <GalleryItem
                    data-gallery-index={index}
                    title={file.name}
                    draggable
                    $isDragging={draggingIndex === index}
                    $isDragOver={dragOverIndex === index}
                    onDragStart={(e) => onItemDragStart(e, index)}
                    onDragOver={(e) => onItemDragOver(e, index)}
                    onDrop={(e) => onItemDrop(e, index)}
                    onDragEnd={onItemDragEnd}
                    onTouchStart={(e) => onItemTouchStart(e, index)}
                    onTouchMove={onItemTouchMove}
                    onTouchEnd={onItemTouchEnd}
                  >
                    <PdfThumb>
                      <FileText size={28} />
                    </PdfThumb>
                    <DragHandle>
                      <GripVertical size={12} />
                    </DragHandle>
                    <RemoveBtn
                      type="button"
                      onClick={() => removeFile(id)}
                      title={`Remove ${file.name}`}
                    >
                      <X size={10} strokeWidth={2.5} />
                    </RemoveBtn>
                  </GalleryItem>
                  <FileName title={file.name}>{file.name}</FileName>
                </GalleryItemWrapper>
              ))}
            </GalleryItems>
          </GalleryBox>
        )}

        <Button isPending={isPosting}>Complete</Button>
      </Form>
    </Wrapper>
  );
}
