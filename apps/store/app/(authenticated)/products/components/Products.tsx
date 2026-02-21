import { cookies } from "next/headers";
import Image from "next/image";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 500px;
  max-width: 500px;
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
  font-size: 20px;
`;

const ProductType = styled.p`
  font-size: 15px;
`;

const ProductMetrics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const ProductSalesCount = styled.p`
  font-size: 15px;
`;

const ProductSalesPercent = styled.p`
  font-size: 15px;
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

export async function Products() {
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
        <Wrapper id={product.id}>
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
      ))}
    </Grid>
  );
}
