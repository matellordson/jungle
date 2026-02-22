import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Grid = styled.div`
  margin: auto;
  max-width: 1500px;
  display: grid;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 5px;

  /* Desktop (default) */
  grid-template-columns: repeat(3, 1fr);

  /* Tablet */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Mobile */
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CellWrapper = styled.div`
  padding: 5px 10px;
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const ProductIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductImage = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background-color: var(--foreground);
  border: var(--border);

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
  }
`;

const ProductNameAndType = styled.div``;

const ProductName = styled.p`
  font-size: 16px;
  color: var(--text-dark);
`;

const ProductType = styled.p`
  font-size: 14px;
`;

const ProductMetrics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  align-items: center;
  height: 100%;
`;

const ProductSalesCount = styled.p`
  font-size: 14px;
`;

const ProductSalesPercent = styled.p`
  font-size: 14px;
  background-color: var(--green-bg);
  color: var(--green-bg-text);
  padding: 2px 10px;
  border-radius: 5px;
`;

interface ProductType {
  id: string;
  name: string;
  cover_image: string;
}

export async function ProductList() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const api = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/mine`, {
    headers: {
      Cookie: allCookies,
    },
  });

  const data: ProductType[] = await api.json();

  return (
    <Grid>
      {data.map((product) => (
        <CellWrapper key={product.id}>
          <Link href={"#"} style={{ color: "inherit" }}>
            <Wrapper>
              <ProductIdentity>
                <ProductImage>
                  <Image
                    src={product.cover_image}
                    alt={product.name}
                    height={50}
                    width={50}
                  />
                </ProductImage>
                <ProductNameAndType>
                  <ProductName>{product.name}</ProductName>
                  <ProductType>Single</ProductType>
                </ProductNameAndType>
              </ProductIdentity>

              <ProductMetrics>
                <ProductSalesCount>2382</ProductSalesCount>
                <ProductSalesPercent>2.9k</ProductSalesPercent>
              </ProductMetrics>
            </Wrapper>
          </Link>
        </CellWrapper>
      ))}
    </Grid>
  );
}
