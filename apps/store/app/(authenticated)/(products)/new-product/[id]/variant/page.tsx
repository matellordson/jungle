import VariantComponent from "./component";

export default async function VariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <VariantComponent productId={id} />;
}
