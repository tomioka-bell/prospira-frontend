"use client";

import dynamic from "next/dynamic";
import CompanyNews from "./company-news";

// Lazy load below-the-fold components - these need ssr: false because they use i18n hooks
const SafetyFirst = dynamic(() => import("./safety-first"), { 
  loading: () => <div className="h-96" />,
  ssr: false 
});
const CreatingCustomer = dynamic(() => import("./creating-customer"), { 
  loading: () => <div className="h-96" />,
  ssr: false 
});
const EnvironmentalMission = dynamic(() => import("./environmental-mission"), { 
  loading: () => <div className="h-96" />,
  ssr: false 
});

export function HomePageDynamicSections() {
  return (
    <>
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
    </>
  );
}
