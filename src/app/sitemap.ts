import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN!;
const SITE_URL = 'https://muscledenz.com';

async function fetchProducts() {
    try {
        const res = await fetch(`${STRAPI_URL}/api/products?fields[0]=slug&fields[1]=updatedAt`, {
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!res.ok) {
            console.error('Failed to fetch products for sitemap');
            return [];
        }

        const data = await res.json();
        return data?.data || [];
    } catch (error) {
        console.error('Error fetching products for sitemap:', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await fetchProducts();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },

    ];

    // Dynamic product pages
    const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
        url: `${SITE_URL}/products/${product.documentId}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...productPages];
}
