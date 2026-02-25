import { ProductModal } from "./components/modal";

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ProductModal content={<p>{id}</p>} title={<p>Title</p>}></ProductModal>
  );
}
