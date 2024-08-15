import { ReactNode } from "react";
import Header from "./Header";
import SideNavbar from "./sideNavbar/Side-navbar";

interface DesktopLayoutPropsType {
  children: ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutPropsType) => {
  return (
    <div>
      <div>
        <SideNavbar />
      </div>
      <div>
        <Header />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default DesktopLayout;
