import type { Metadata } from 'next';
import CompanyNewsListClient from "./company-news-list-client";

export const metadata: Metadata = {
  title: "News & Activities | PROSPIRA Corporation",
  description: "Latest news and activities from PROSPIRA Corporation. Stay updated with our company announcements and events.",
};

export const dynamic = "force-static";

export default function CompanyNewsPage() {
  return <CompanyNewsListClient />;
}
