"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useRef, useState, useCallback, useEffect, FormEvent } from "react";
import styled from "styled-components";
import * as pdfjsLib from "pdfjs-dist";
import { redirect } from "next/navigation";
import "material-symbols";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 6px;
  height: 100%;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
`;

const FileItem = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 300px;
  width: 200px;
  background-color: var(--highlight);
  overflow: hidden;
  border: var(--border);

  canvas {
    display: block;
  }
`;

const FileName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
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
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.85);
  }
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

const EmptyState = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function PdfPreview({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);

      if (cancelled || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;

      const dpr = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.max(200 / viewport.width, 300 / viewport.height) * dpr;
      const scaled = page.getViewport({ scale });

      canvas.width = scaled.width;
      canvas.height = scaled.height;

      canvas.style.width = `${scaled.width / dpr}px`;
      canvas.style.height = `${scaled.height / dpr}px`;

      await page.render({
        canvasContext: ctx,
        viewport: scaled,
        canvas: canvas,
      }).promise;
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return <canvas ref={canvasRef} />;
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  file: File;
}

export function DetailsComponent({ productId }: { productId: string }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((selected: FileList | null) => {
    if (!selected) return;
    const pdfs = Array.from(selected).filter(
      (f) => f.type === "application/pdf",
    );
    const newEntries: UploadedFile[] = pdfs.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
    }));
    setFiles((prev) => [...prev, ...newEntries]);
  }, []);

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);

    const orderedUrls: string[] = [];

    for (const { file } of files) {
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
      <Heading>Product Complete buyer's guide</Heading>
      <Main>
        <ButtonWrapper>
          <HiddenInput
            ref={inputRef}
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
          >
            Choose a file
          </Button>
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant="default" loading={isPosting}>
              Submit
            </Button>
          </form>
        </ButtonWrapper>

        <Card height="340px">
          <FileWrapper>
            {files.length === 0 ? (
              <EmptyState>No PDF file</EmptyState>
            ) : (
              files.map((file) => (
                <FileItem key={file.id}>
                  <PdfPreview url={file.url} />
                  <FileName>{file.name}</FileName>
                  <RemoveBtn
                    type="button"
                    onClick={() => handleRemove(file.id)}
                  >
                    <Icon className="material-symbols-sharp">close</Icon>
                  </RemoveBtn>
                </FileItem>
              ))
            )}
          </FileWrapper>
        </Card>
      </Main>
    </Wrapper>
  );
}
