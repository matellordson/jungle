import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/mine`, {
    headers: {
      Cookie: allCookies,
    },
  });
  const data = await res.json();

  const products = data.products ?? data ?? [];
  const exists = products.some((product: { id: string }) => product.id === id);

  if (!exists) {
    notFound();
  }

  return <>{children}</>;
}
