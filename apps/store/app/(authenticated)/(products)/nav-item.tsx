import styled from "styled-components";
import "material-symbols";
import Link from "next/link";

const Wrapper = styled.div`
  /* height: 200px; */
`;

const MenuItem = styled(Link)`
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
      name: "inventory",
      icon: "inventory_2",
      link: "/inventory",
    },
    {
      name: "stock",
      icon: "numbers",
      link: "/stock",
    },
    {
      name: "metrics",
      icon: "area_chart",
      link: "/metrics",
    },
  ];
  return (
    <Wrapper>
      {links.map((item) => (
        <MenuItem href={item.link} key={item.name}>
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
      ))}
    </Wrapper>
  );
}
