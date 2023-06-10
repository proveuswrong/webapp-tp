import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/others/header";
import Navigation from "./components/others/navigation";
import Footer from "./components/others/footer";

export default function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/about";
  return (
    <>
      <Header />
      <Navigation />
      <main className={`${isLandingPage ? "zero-padding": null}`}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" newestOnTop autoClose={10000} />
    </>
  );
}
