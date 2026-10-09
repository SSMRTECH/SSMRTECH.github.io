import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Customers } from "@/components/Customers";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Customers />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
