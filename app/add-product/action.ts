"use server";

import { pinata } from "@/utils/config";

export default async function addProductAction(formData: FormData) {
  const media = formData.get("media") as File;
  try {
    const { cid } = await pinata.upload.public.file(media);
    const url = await pinata.gateways.public.convert(cid);
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}
