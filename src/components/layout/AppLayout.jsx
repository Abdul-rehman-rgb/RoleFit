import { Outlet } from "react-router";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const AppLayout = () => (
  <div className="flex min-h-screen flex-col bg-neutral-50">
    <SiteHeader />
    <Outlet />
    <SiteFooter />
  </div>
);

export default AppLayout;
