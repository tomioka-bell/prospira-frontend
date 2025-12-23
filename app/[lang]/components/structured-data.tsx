'use client';

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PROSPIRA Corporation',
    url: 'https://prospira.com',
    logo: 'https://prospira.com/logo-company.png',
    description: 'Leading provider of premium products and innovative industrial solutions',
    sameAs: [
      'https://www.facebook.com/prospira',
      'https://www.linkedin.com/company/prospira',
      'https://twitter.com/prospira',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'th'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TH',
      addressLocality: 'Thailand',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
