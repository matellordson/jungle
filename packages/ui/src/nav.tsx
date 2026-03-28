import TextLogo from "./text-logo";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  margin-bottom: 60px;
  background-color: var(--background);
  border-bottom: var(--border);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Profile = styled.div`
  height: 40px;
  width: 40px;
  background-color: var(--foreground);
`;

export function Navbar() {
  return (
    <Wrapper>
      <TextLogo height={20} width={100} />
      <Profile />
    </Wrapper>
  );
}
