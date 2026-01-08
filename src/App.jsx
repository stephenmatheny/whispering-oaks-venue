import { venue } from "./data/venue";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import Section from "./components/Section";

export default function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header venue={venue} />
      <Hero venue={venue} />
      <About venue={venue} />
      <Gallery venue={venue} />
      <Contact venue={venue} />
      <Footer venue={venue} />
    </main>
  );
}
