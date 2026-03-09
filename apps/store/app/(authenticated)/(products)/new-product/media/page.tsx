"use client";
import styled from "styled-components";
import { FormEvent, useState } from "react";
import { Input } from "../../../../../components/input";
import { Button } from "../../../../../components/button";
import Logo from "../components/logo";
import { redirect } from "next/navigation";
import { ImagePlus, X } from "lucide-react";

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

const UploadBox = styled.div`
  height: 150px;
  width: 100%;
  border: 1px dashed var(--border-bg);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

const UploadBoxTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

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
    color: inherit;
    font: inherit;
    color: var(--accent);
    cursor: pointer;

    &:hover {
      opacity: 90%;
      transition: all 0.4s ease-in-out;
    }
  }
`;

const GalleryBox = styled.div`
  height: 120px; /* Increased slightly to account for scrollbar height */
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

const GalleryItem = styled.div`
  height: 80px;
  width: 80px;
  background-color: var(--background);
  border: var(--border);
  border-radius: 5px;
  position: relative;
  flex-shrink: 0;
`;

const RemoveGalleryItem = styled.div`
  height: 17px;
  width: 17px;
  background-color: var(--highlight);
  border: var(--border);
  border-radius: 100%;
  position: absolute;
  right: -5px;
  top: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  cursor: pointer;

  &:hover {
    svg {
      color: var(--red-bg-text);
    }
    background-color: var(--red-bg);
  }
`;

export default function Identity() {
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPosting(true);
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     store: "",
    //     name: productName,
    //     tagline: tagline,
    //     categories: selectedCategory,
    //   }),
    //   credentials: "include",
    // });
    // redirect("/new-product/media");
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
        <UploadBox>
          <UploadBoxTitle>
            <ImagePlus />
            <p>Upload Gallery</p>
          </UploadBoxTitle>
          <UploadBoxPara>
            <p>
              Drag and drop your files here, or <button>click to select</button>
              .
            </p>
            <p>JPG, JPEG, PNG and WEBP. Max 20MB</p>
          </UploadBoxPara>
        </UploadBox>
        <GalleryBox>
          <GalleryItems>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
            <GalleryItem>
              <RemoveGalleryItem>
                <X />
              </RemoveGalleryItem>
            </GalleryItem>
          </GalleryItems>
        </GalleryBox>
        <Button isPending={isPosting == true}>Look's good</Button>
      </Form>
    </Wrapper>
  );
}
