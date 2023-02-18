import { Nav } from "./Nav";

export const Layout = ({ children }) => {
  return (
    <>
      {/* <SocialMedia /> */}
      <Nav />
      <main>{children}</main>
    </>
  );
};
