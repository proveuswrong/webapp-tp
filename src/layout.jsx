import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/others/header";
import Navigation from "./components/others/navigation";
import Footer from "./components/presentational/footer";

export default function Layout() {
  return (
    <>
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" newestOnTop autoClose={10000} />
    </>
  );
}
