import { Navbar } from "../../components/navbar";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 0px 15px;
`;

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
}
