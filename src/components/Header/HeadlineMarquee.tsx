
import TopMarquee from "./TopMarquee";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN!;

async function fetchFromStrapi(endpoint: string, query = '') {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}${query}`, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
       return null;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch from Strapi for marquee:", error);
    return null;
  }
}

export default async function HeadlineMarquee() {
  // Use populate=* to ensure we get all fields including headLineText
  const homePage = await fetchFromStrapi('home-page', '?populate=*');
  const homePageData = homePage?.data;
  
  const headline = homePageData?.headLineText;

  if (!headline) {
    return null;
  }

  return (
    <TopMarquee text={headline} />
  );
}
