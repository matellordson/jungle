"use server";

import { pinata } from "@/utils/config";

export default async function addProductAction(formData: FormData) {
  const media = formData.get("media") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const price = formData.get("price") as string;
  try {
    const { cid } = await pinata.upload.public.file(media);
    const url = await pinata.gateways.public.convert(cid);
    console.log({
      title,
      description,
      category,
      price,
    });
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}
