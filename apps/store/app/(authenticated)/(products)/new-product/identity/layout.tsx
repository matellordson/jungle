import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product | Identity",
};

export default function IdentityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
