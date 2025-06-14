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
import { CheckIcon, ChevronsUpDownIcon, ImageUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const categories = [
  {
    value: "furniture",
    label: "Furniture",
  },
  {
    value: "clothing",
    label: "Clothing",
  },
  {
    value: "electronics",
    label: "Electronics",
  },
];

export default function AddProduct() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
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
    <div className="mx-auto max-w-xl">
      <form action={addProductAction} className="space-y-5">
        {/* Product Media */}
        <Card>
          <CardHeader>
            <CardTitle>Product Media</CardTitle>
            <CardDescription>
              Attach photos or videos of product
            </CardDescription>
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
              {/* Category popover */}
              <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={categoryOpen}
                    className="w-full justify-between"
                  >
                    {categoryValue
                      ? categories.find(
                          (category) => category.value === categoryValue,
                        )?.label
                      : "Select category..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(currentValue) => {
                              setCategoryValue(
                                currentValue === categoryValue
                                  ? ""
                                  : currentValue,
                              );
                              setCategoryOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                categoryValue === category.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                type="text"
                name="category"
                id="category"
                value={categoryValue}
                onChange={() => categoryValue}
                hidden
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price:</Label>
              <Input type="text" name="price" id="price" />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          size={"lg"}
          className="w-full cursor-pointer tracking-wide"
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
