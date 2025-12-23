import type { Metadata } from 'next';
import Content from "./content";
import Footer from "../components/footer";
import Header from "./header";

export const metadata: Metadata = {
  title: "Our Strengths | PROSPIRA Corporation",
  description: "Learn about PROSPIRA Corporation's core strengths, competitive advantages, and commitment to excellence.",
};

export default function OurStrengths() {
  return (
    <div >
        <Header />
        <Content />
        <Footer />
    </div>
  )
}