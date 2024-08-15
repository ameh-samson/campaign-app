import { ReactNode } from "react";
import Header from "./Header";
import SideNavbar from "./sideNavbar/Side-navbar";

interface DesktopLayoutPropsType {
  children: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutPropsType) => {
  return (
    <div>
      <SideNavbar />
      <Header />

      <div>{children}</div>
    </div>
  );
};

export default DesktopLayout;
