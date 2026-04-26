
import TopMarquee from "./TopMarquee";

const API_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

async function fetchFromApi(endpoint: string, query = '') {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}${query}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
       return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch from API for marquee:", error);
    return null;
  }
}

export default async function HeadlineMarquee() {
  const homePage = await fetchFromApi('homepage', '?populate=*');
  const homePageData = homePage?.data;
  
  const headline = homePageData?.headlineText;

  if (!headline) {
    return null;
  }

  return (
    <TopMarquee text={headline} />
  );
}
