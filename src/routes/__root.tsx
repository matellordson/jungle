import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <div
      style={{
        paddingTop: "2rem",
      }}
    >
      {/* <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link> */}
    </div>
    {/* <hr /> */}
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
