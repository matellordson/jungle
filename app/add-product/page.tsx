"use client";

import Image from "next/image";
import addProductAction from "./action";
import { ChangeEvent, useState } from "react";

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [previewURL, setPreviewURL] = useState<string | null>();

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewURL(null);
    }
  }

  return (
    <form action={addProductAction}>
      <input
        onChange={handleFileChange}
        type="file"
        name="media"
        accept="image/*"
      />
      {previewURL ? (
        <Image src={previewURL} alt="media" height={200} width={200} />
      ) : (
        ""
      )}
      <button type="submit">submit</button>
    </form>
  );
}
