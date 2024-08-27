import { childrenPropsType } from "@/types";
import SideNavbar from "@/components/SideNavbar";
import Header from "@/components/Header";

const GrandLayout = ({ children }: childrenPropsType) => {
  return (
    <div className="min-h-screen">
      <SideNavbar />
      <Header />
      {children}
    </div>
  );
};

export default GrandLayout;
