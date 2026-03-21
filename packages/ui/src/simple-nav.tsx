import TextLogo from "./text-logo";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  margin-bottom: 60px;
`;

const Profile = styled.div`
  height: 40px;
  width: 40px;
  background-color: #000000;
`;

export function SimpleNavbar() {
  return (
    <Wrapper>
      <TextLogo height={20} width={100} />
      <Profile />
    </Wrapper>
  );
}
