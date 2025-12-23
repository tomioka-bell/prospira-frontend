import type { Metadata } from 'next';
import BusinessPolicyContent from "./content";
import Header from "./header";

export const metadata: Metadata = {
  title: "Business Policy | PROSPIRA Corporation",
  description: "Review PROSPIRA Corporation's business policies and commitment to quality, sustainability, and customer satisfaction.",
};

export default function BusinessPolicyPage() {
  return (
    <div>
        <Header />
        <BusinessPolicyContent />
    </div>
  )
}