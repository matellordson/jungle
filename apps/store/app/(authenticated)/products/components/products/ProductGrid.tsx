import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div``;

const ItemWrapper = styled.div`
  margin: auto;
  max-width: 1500px;
  display: grid;
  margin-bottom: 5px;

  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CellWrapper = styled.div`
  padding: 5px;
  border-right: var(--border);
  border-bottom: var(--border);

  &:nth-child(3n),
  &:last-child {
    border-right: none;
  }

  @media (max-width: 1024px) {
    &:nth-child(3n) {
      border-right: var(--border);
    }
    &:nth-child(2n),
    &:last-child {
      border-right: none;
    }
  }

  @media (max-width: 600px) {
    padding: 5px 0;

    &:nth-child(n) {
      border-right: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--foreground);
  border-radius: 5px;
  border: var(--border);
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }
`;

const ProductName = styled.p`
  font-size: 15px;
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
  return (
    <Wrapper>
      <ItemWrapper>
        {data.map((product) => (
          <CellWrapper key={product.id}>
            <Link href={"#"} className="link" style={{ color: "inherit" }}>
              <Item>
                <ImageBox>
                  <Image src={product.cover_image} alt={product.name} fill />
                </ImageBox>
                <ProductName>{product.name}</ProductName>
              </Item>
            </Link>
          </CellWrapper>
        ))}
      </ItemWrapper>
    </Wrapper>
  );
}
