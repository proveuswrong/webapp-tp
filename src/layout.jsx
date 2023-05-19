import Header from "./components/others/header";
import Navigation from "./components/others/navigation";
import Footer from "./components/others/footer";

export default function Layout({children}) {
  return (
    <>
      <Header/>
      <Navigation/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}
