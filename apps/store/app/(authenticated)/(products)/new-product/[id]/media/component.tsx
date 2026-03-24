"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import styled from "styled-components";
import { useRef, useState, FormEvent } from "react";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  width: 100%;
`;

const ImageItem = styled.div`
  background-color: var(--highlight);
  aspect-ratio: 1 / 1;
  width: 100%;
  position: relative;
  border: var(--border);

  & img,
  & video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  color: white;
  font-size: 18px;
  pointer-events: none;
  line-height: 1;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
`;

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
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

const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE_MB = 20;
const MAX_VIDEO_SIZE_MB = 100;

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

export default function MediaComponent({ productId }: { productId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
      const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) continue;

      if (isImage && file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) continue;
      if (isVideo && file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) continue;

      newFiles.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        type: isImage ? "image" : "video",
      });
    }

    if (newFiles.length > 0) setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const f = prev.find((f) => f.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;
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
      const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`;
      orderedUrls.push(fileUrl);
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ image_url: orderedUrls }),
    });

    setIsPosting(false);
    redirect(`/new-product/${productId}/details`);
  };

  return (
    <Wrapper>
      <Heading>What does this product look like?</Heading>
      <Main>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.mp4,.webm,.mov"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <form onSubmit={handleSubmit}>
          <ButtonWrapper>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPosting}
            >
              choose a file
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isPosting}
              disabled={uploadedFiles.length === 0 || isPosting}
            >
              submit
            </Button>
          </ButtonWrapper>
        </form>
        <Card height="400px">
          {uploadedFiles.length === 0 ? (
            <EmptyContainer>No image or video file</EmptyContainer>
          ) : (
            <ImageWrapper>
              {uploadedFiles.map(({ id, preview, file, type }) => (
                <ImageItem key={id}>
                  {type === "image" ? (
                    <img src={preview} alt={file.name} />
                  ) : (
                    <>
                      <video src={preview} />
                      <VideoIndicator>
                        <Icon className="material-symbols-sharp">videocam</Icon>
                      </VideoIndicator>
                    </>
                  )}
                  <RemoveBtn type="button" onClick={() => removeFile(id)}>
                    <Icon className="material-symbols-sharp">close</Icon>
                  </RemoveBtn>
                </ImageItem>
              ))}
            </ImageWrapper>
          )}
        </Card>
      </Main>
    </Wrapper>
  );
}
