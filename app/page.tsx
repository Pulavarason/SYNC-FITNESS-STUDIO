import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import WhySync from "@/components/WhySync";
import Programs from "@/components/Programs";
import Experience247 from "@/components/Experience247";
import Gallery from "@/components/Gallery";
import Membership from "@/components/Membership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-sync focus:px-5 focus:py-3 focus:text-black"
      >
        Skip to content
      </a>
      <Loader />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhySync />
        <Programs />
        <Experience247 />
        <Gallery />
        <Membership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
