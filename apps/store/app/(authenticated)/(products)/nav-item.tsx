import styled from "styled-components";
import "material-symbols";
import Link from "next/link";

const Wrapper = styled.div`
  /* height: 200px; */
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  &:hover {
    background-color: var(--highlight);
  }
`;

const MenuItemTitle = styled.p`
  text-transform: capitalize;
`;

export function ProductNavItems() {
  const links = [
    {
      name: "stock",
      icon: "package",
    },
  ];
  return (
    <Wrapper>
      {links.map((item) => (
        <Link href={"/stock"} key={item.name}>
          <MenuItem>
            <span
              className="material-symbols-sharp"
              style={{
                color: "var(--paragraph-color)",
                fontSize: "20px",
              }}
            >
              {item.icon}
            </span>
            <MenuItemTitle>{item.name}</MenuItemTitle>
          </MenuItem>
        </Link>
      ))}
    </Wrapper>
  );
}
