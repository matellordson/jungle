import DetailsComponent from "./component";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailsComponent productId={id} />;
}
