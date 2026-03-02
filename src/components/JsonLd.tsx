import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Component for rendering JSON-LD structured data
 * Used for SEO to help search engines understand page content
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
