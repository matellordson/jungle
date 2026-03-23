import MediaComponent from "./component";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MediaComponent productId={id} />;
}
