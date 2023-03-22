import Header from "./components/others/header";
import Footer from "./components/others/footer";

export default function Layout({children}) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}
