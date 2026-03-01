import { MenuItem } from "./reusable";

export function Menu() {
  return (
    <>
      <MenuItem name="View" content={<p>View menu element</p>} />
      <MenuItem name="Chart" content={<p>View menu element</p>} />
    </>
  );
}
