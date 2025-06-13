"use client";

import Image from "next/image";
import addProductAction from "./action";
import { ChangeEvent, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";

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
    <Card>
      <CardHeader>
        <CardTitle>Upload media</CardTitle>
        <CardDescription>Attach photos or videos of product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed h-60 w-full rounded-lg p-2 flex justify-center items-center flex-col gap-y-5">
          {!previewURL ? (
            <div className="">
              <ImageUp size={70} className="text-muted-foreground" />
            </div>
          ) : (
            <div className="w-full">
              {previewURL && selectedFile && (
                <div className="">
                  {selectedFile.type.startsWith("image/") ? (
                    <Image
                      src={previewURL}
                      alt="Selected file"
                      height={200}
                      width={200}
                      className="max-h-56 min-w-full object-cover object-center rounded-lg"
                    />
                  ) : selectedFile.type.startsWith("video/") ? (
                    <video
                      src={previewURL}
                      controls
                      className="max-h-56 min-w-full object-cover object-center rounded-lg"
                    />
                  ) : null}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-x-3">
        <p className="w-full truncate text-muted-foreground hidden">
          {selectedFile?.name}
        </p>
        <Button
          variant={"destructive"}
          size={"sm"}
          className={`cursor-pointer ${!previewURL && "opacity-20"}`}
          onClick={() => setPreviewURL(null)}
        >
          Remove
        </Button>
        <Button asChild size={"sm"} onClick={() => setPreviewURL(null)}>
          <form action={addProductAction}>
            <label htmlFor="media" className="cursor-pointer font-medium">
              Upload
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              className="hidden"
              id="media"
              accept="image/*,video/*"
              name="media"
            />
          </form>
        </Button>
      </CardFooter>
    </Card>
  );
}
