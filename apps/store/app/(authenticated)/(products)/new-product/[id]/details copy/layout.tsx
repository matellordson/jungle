import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product | Details",
};

export default function DetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
