"use client";
import { LayoutGrid } from "../ui/layout-grid";

const ImageContent = ({ 
  title, 
  description, 
  defaultTitle, 
  defaultSubtitle, 
  defaultDescription 
}: { 
  title?: string; 
  description?: string; 
  defaultTitle: string; 
  defaultSubtitle: string; 
  defaultDescription: string; 
}) => {
  return (
    <div className="min-w-full">
      <p className="font-bold md:text-4xl text-xl w-full text-white">
        {title || defaultTitle}
      </p>
      {!title && <p className="font-normal text-base text-white">{defaultSubtitle}</p>}
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {description || defaultDescription}
      </p>
    </div>
  );
};

export function ImageLayoutGrid({ about_us }: { about_us?: { url: string; title?: string; description?: string; _id?: string }[] }) {
  const cards = [
    {
      id: 1,
      content: (
        <ImageContent 
          title={about_us?.[0]?.title}
          description={about_us?.[0]?.description}
          defaultTitle="Massive Muscles"
          defaultSubtitle="MuscleDenz Supplement Series"
          defaultDescription="Designed to improve energy, stamina, and immunity. This powerful formula helps you push through your limits and achieve the physique you've always worked for."
        />
      ),
      className: "md:col-span-2",
      thumbnail: about_us?.[0]?.url || "/imageGrid/img2.png"
    },
    {
      id: 2,
      content: (
        <ImageContent 
          title={about_us?.[1]?.title}
          description={about_us?.[1]?.description}
          defaultTitle="Detox & Burn"
          defaultSubtitle="Alcefit & Fat Burner Combo"
          defaultDescription="Cleanse your system and resize your body. Our premium quality detox and fat burner supplements work in tandem to boost metabolism and purify your internal health."
        />
      ),
      className: "col-span-1",
      thumbnail: about_us?.[1]?.url || "/imageGrid/img1.png"
    },
    {
      id: 3,
      content: (
        <ImageContent 
          title={about_us?.[2]?.title}
          description={about_us?.[2]?.description}
          defaultTitle="Unleash Your Power"
          defaultSubtitle="Pure Himalayan Shilajit"
          defaultDescription="Authentic, natural, and potent. Our lab-tested resin form Shilajit provides the energy and vitality needed to conquer the toughest peaks and the hardest workouts."
        />
      ),
      className: "col-span-1",
      thumbnail: about_us?.[2]?.url || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNlfGVufDB8fDB8fHww"
    },
    {
      id: 4,
      content: (
        <ImageContent 
          title={about_us?.[3]?.title}
          description={about_us?.[3]?.description}
          defaultTitle="Bulk Build"
          defaultSubtitle="Advanced Muscle Gainer"
          defaultDescription="The ultimate choice for serious gains. Formulated for those looking to add significant size and strength, making every rep count towards your mass goals."
        />
      ),
      className: "md:col-span-2",
      thumbnail: about_us?.[3]?.url || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNlfGVufDB8fDB8fHww"
    }
  ];

  return (
    <div className="h-screen md:py-5 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}
