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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
    <form action={addProductAction} className="space-y-5">
      {/* Product Media */}
      <Card>
        <CardHeader>
          <CardTitle>Product Media</CardTitle>
          <CardDescription>Attach photos or videos of product</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex h-60 w-full flex-col items-center justify-center gap-y-5 rounded-lg border border-dashed p-2">
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
                        className="max-h-56 min-w-full rounded-lg object-cover object-center"
                      />
                    ) : selectedFile.type.startsWith("video/") ? (
                      <video
                        src={previewURL}
                        controls
                        className="max-h-56 min-w-full rounded-lg object-cover object-center"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-end gap-x-3">
          <p className="text-muted-foreground hidden w-full truncate">
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
            <div>
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
            </div>
          </Button>
        </CardFooter>
      </Card>

      {/* Product Identification */}
      <Card>
        <CardHeader>
          <CardTitle>Product Identification</CardTitle>
          <CardDescription>
            Tell a buyer exactly what your product is and what it does.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Name/Title:</Label>
            <Input type="text" name="title" id="title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description:</Label>
            <Input type="text" name="description" id="description" />
          </div>
        </CardContent>
      </Card>

      {/* Product Availability & Options */}
      <Card>
        <CardHeader>
          <CardTitle>Product Availability & Options</CardTitle>
          <CardDescription>
            Include current status and any variations available for product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category/Subcategory: </Label>
            <Input type="text" name="category" id="category" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price:</Label>
            <Input type="text" name="price" id="price" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
