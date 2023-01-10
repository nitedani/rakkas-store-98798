import { Layout, Link } from "rakkasjs";

const MainLayout: Layout = ({ children }) => (
  <>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>

    {children}
  </>
);

export default MainLayout;
