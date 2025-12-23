import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "./header";
import Greeting from "./greeting";
import CompanyInformation from "./company-information";
import OurStrengths from "./our-strengths";
import ProductInformation from "./product-information";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Lazy load below-the-fold components
const CompanyNews = dynamic(() => import("./company-news"), { 
  loading: () => <div className="h-96" />,
  ssr: true 
});
const SafetyFirst = dynamic(() => import("./safety-first"), { 
  loading: () => <div className="h-96" />,
  ssr: true 
});
const CreatingCustomer = dynamic(() => import("./creating-customer"), { 
  loading: () => <div className="h-96" />,
  ssr: true 
});
const EnvironmentalMission = dynamic(() => import("./environmental-mission"), { 
  loading: () => <div className="h-96" />,
  ssr: true 
});

export const metadata: Metadata = {
  title: "Home | PROSPIRA Corporation",
  description: "Welcome to PROSPIRA Corporation - your partner for premium industrial products and innovative solutions.",
};

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [
    { lang: "th" },
    { lang: "en" },
  ];
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return (
    <>
      <Navbar />
      <main>
        <Header lang={lang} />
        <section id="greeting">
          <Greeting />
        </section>
        <section id="company-info">
          <CompanyInformation lang={lang} />
        </section>
        <section id="strengths">
          <OurStrengths />
        </section>
        <section id="products">
          <ProductInformation lang={lang} />
        </section>
        <section id="safety">
          <SafetyFirst />
        </section>
        <section id="customer">
          <CreatingCustomer />
        </section>
        <section id="environment">
          <EnvironmentalMission />
        </section>
        <section id="news">
          <CompanyNews />
        </section>
      </main>
      <Footer />
    </>
  );
}
