"use client";
import styled, { css, keyframes } from "styled-components";
import { FormEvent, useState, useRef, useCallback } from "react";
import { Button } from "../../../../../components/button";
import Logo from "../components/logo";
import { ImagePlus, X, Video, GripVertical } from "lucide-react";

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

const UploadBoxTitleDivider = styled.span`
  color: var(--border-bg);
  font-size: 18px;
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
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
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

const VideoIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 0 5px 5px;
  padding: 3px 5px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: var(--text-dark);
  font-size: 10px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s;

  ${GalleryItem}:hover & {
    opacity: 1;
  }

  & svg {
    color: var(--text-dark);
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--border-bg);
  background: var(--background);
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
    color: var(--text-dark);
  }

  svg:hover {
    color: var(--red-bg-text);
  }

  ${GalleryItem}:hover & {
    opacity: 1;
    transform: scale(1);
  }

  &:hover {
    background: var(--red-bg);
    border: none;
  }

  &:active {
    transform: scale(0.9);
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
  preview: string;
  type: "image" | "video";
  duration?: number;
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE_MB = 20;
const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_DURATION_SEC = 60;

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Media() {
  const [isPosting, setIsPosting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const validateVideo = (
    file: File,
  ): Promise<{ ok: boolean; reason?: string; duration?: number }> =>
    new Promise((resolve) => {
      if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) {
        resolve({
          ok: false,
          reason: `"${file.name}" exceeds the ${MAX_VIDEO_SIZE_MB}MB video limit.`,
        });
        return;
      }
      const url = URL.createObjectURL(file);
      const vid = document.createElement("video");
      vid.preload = "metadata";
      vid.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        if (vid.duration > MAX_VIDEO_DURATION_SEC) {
          resolve({
            ok: false,
            reason: `"${file.name}" is ${formatDuration(vid.duration)} — max is ${MAX_VIDEO_DURATION_SEC}s.`,
          });
        } else {
          resolve({ ok: true, duration: vid.duration });
        }
      };
      vid.onerror = () => {
        URL.revokeObjectURL(url);
        resolve({ ok: false, reason: `"${file.name}" could not be read.` });
      };
      vid.src = url;
    });

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newErrors: string[] = [];
    const newFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
      const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);

      if (!isImage && !isVideo) {
        newErrors.push(`"${file.name}" is not a supported type.`);
        continue;
      }

      if (isImage) {
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
          newErrors.push(`"${file.name}" exceeds ${MAX_IMAGE_SIZE_MB}MB.`);
          continue;
        }
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
          type: "image",
        });
      }

      if (isVideo) {
        const result = await validateVideo(file);
        if (!result.ok) {
          newErrors.push(result.reason!);
          continue;
        }
        newFiles.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
          type: "video",
          duration: result.duration,
        });
      }
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
    setUploadedFiles((prev) => {
      const f = prev.find((f) => f.id === id);
      if (f !== undefined) URL.revokeObjectURL(f.preview);
      return prev.filter((f) => f.id !== id);
    });
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);

    const mediaPayload = uploadedFiles.map((f, index) => ({
      order: index,
      type: f.type,
      filename: f.file.name,
      size: f.file.size,
      ...(f.duration !== undefined && { duration: Math.round(f.duration) }),
    }));

    const formData = new FormData();
    uploadedFiles.forEach(({ file, type }) =>
      formData.append(type === "video" ? "videos" : "media", file),
    );
    formData.append("mediaOrder", JSON.stringify(mediaPayload));
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, {
    //   method: "POST",
    //   body: formData,
    //   credentials: "include",
    // });
    // redirect("/new-product/media");

    setIsPosting(false);
  };

  return (
    <Wrapper>
      <StageIntro>
        <StageTitle>
          <Logo />
          What does it look like?
        </StageTitle>
      </StageIntro>
      <Form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.mp4,.webm,.mov"
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
            <ImagePlus size={18} />
            <p>Image</p>
            <UploadBoxTitleDivider>|</UploadBoxTitleDivider>
            <Video size={18} />
            <p>Video</p>
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
            <UploadBoxHint>Images: JPG, PNG, WEBP — max 20MB</UploadBoxHint>
            <UploadBoxHint>
              Videos: MP4, WEBM, MOV — max 60s & 100MB
            </UploadBoxHint>
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
              {uploadedFiles.map(
                ({ id, preview, file, type, duration }, index) => (
                  <GalleryItem
                    key={id}
                    title={file.name}
                    draggable
                    $isDragging={draggingIndex === index}
                    $isDragOver={dragOverIndex === index}
                    onDragStart={(e) => onItemDragStart(e, index)}
                    onDragOver={(e) => onItemDragOver(e, index)}
                    onDrop={(e) => onItemDrop(e, index)}
                    onDragEnd={onItemDragEnd}
                  >
                    {type === "image" ? (
                      <>
                        <img
                          src={preview}
                          alt={file.name}
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5px",
                            pointerEvents: "none",
                          }}
                        />
                        <DragHandle>
                          <GripVertical size={12} />
                        </DragHandle>
                      </>
                    ) : (
                      <>
                        <video
                          src={preview}
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5px",
                            pointerEvents: "none",
                          }}
                        />
                        <VideoIndicator>
                          <Video size={14} />
                          {duration ? formatDuration(duration) : ""}
                        </VideoIndicator>
                      </>
                    )}

                    <RemoveBtn
                      type="button"
                      onClick={() => removeFile(id)}
                      title={`Remove ${file.name}`}
                    >
                      <X size={10} strokeWidth={2.5} />
                    </RemoveBtn>
                  </GalleryItem>
                ),
              )}
            </GalleryItems>
          </GalleryBox>
        )}

        <Button isPending={isPosting}>Look's good</Button>
      </Form>
    </Wrapper>
  );
}
