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
              <form action={addProductAction}>
                <label htmlFor="media" className="cursor-pointer text-primary">
                  Upload file
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                  id="media"
                  accept="images/*"
                  name="media"
                />
              </form>
            </div>
          ) : (
            <Image
              src={previewURL}
              alt="media"
              height={200}
              width={200}
              className="min-h-56 min-w-full object-cover object-center rounded-lg"
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-x-2">
        <Button
          variant={"destructive"}
          size={"sm"}
          className={`cursor-pointer ${!previewURL && "opacity-30"}`}
          onClick={() => setPreviewURL(null)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
