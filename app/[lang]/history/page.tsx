import type { Metadata } from 'next';
import HistoryContent from "./content";
import Header from "./header";

export const metadata: Metadata = {
  title: "Company History | PROSPIRA Corporation",
  description: "Discover PROSPIRA Corporation's rich history, milestones, and journey of innovation in industrial products.",
};

export default function HistoryPage() {
  return (
    <div>
        <Header />
        <HistoryContent />
    </div>
  )
}