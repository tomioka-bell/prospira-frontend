// import Image from "next/image";
import HomePage  from "./home/page";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [
    { lang: "th" },
    { lang: "en" },
  ];
}

export default function Home({ params }: PageProps) {
  return (
    <div>
      <HomePage params={params} />
    </div>
  );
}
