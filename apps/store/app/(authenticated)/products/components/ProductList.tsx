import { cookies } from "next/headers";

export default async function ProductList() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const api = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/all`, {
    headers: {
      Cookie: allCookies,
    },
  });

  const data = await api.json();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
