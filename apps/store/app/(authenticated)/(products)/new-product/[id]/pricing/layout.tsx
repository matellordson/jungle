import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product | Pricing",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
