import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Product | Media",
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
