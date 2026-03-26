import { PricingComponent } from "./component";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PricingComponent productId={id} />;
}
