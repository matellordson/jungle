import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product | Variant",
};

export default function VariantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
