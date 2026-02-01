import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div``;

const ItemWrapper = styled.div`
  margin: auto;
  max-width: 1000px;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  margin-bottom: 5px;

  /* Desktop (default) */
  grid-template-columns: repeat(4, 1fr);

  /* Tablet */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Mobile */
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & .link {
    color: var(--text-light);
    font-size: 15px;
  }

  & .link:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
    color: var(--text-dark);
  }
`;

const ImageBox = styled.div`
  height: 200px;
  background-color: var(--foreground);
  border-radius: 5px;
  border: var(--border);

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }
`;

interface ProductType {
  id: string;
  name: string;
  cover_image: string;
}

export default async function ProductGrid() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const api = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/mine`, {
    headers: {
      Cookie: allCookies,
    },
  });

  const data: ProductType[] = await api.json();
  console.log(data);
  return (
    <Wrapper>
      <ItemWrapper>
        {data.map((product) => (
          <Item key={product.id}>
            <ImageBox>
              <Image
                src={product.cover_image}
                alt={product.name}
                height={200}
                width={200}
              />
            </ImageBox>
            <Link href={"#"} className="link">
              {product.name}
            </Link>
          </Item>
        ))}
      </ItemWrapper>
    </Wrapper>
  );
}
