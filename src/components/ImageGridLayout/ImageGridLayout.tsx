"use client";
import { LayoutGrid } from "../ui/layout-grid";

const SkeletonOne = () => {
  return (
    <div className="min-w-full">
      <p className="font-bold md:text-4xl text-xl w-full text-white">
        Massive Muscles
      </p>
      <p className="font-normal text-base text-white">MuscleDenz Supplement Series</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Designed to improve energy, stamina, and immunity. This powerful formula 
        helps you push through your limits and achieve the physique you've 
        always worked for.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Detox & Burn
      </p>
      <p className="font-normal text-base text-white">Alcefit & Fat Burner Combo</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Cleanse your system and resize your body. Our premium quality detox 
        and fat burner supplements work in tandem to boost metabolism and 
        purify your internal health.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Unleash Your Power
      </p>
      <p className="font-normal text-base text-white">Pure Himalayan Shilajit</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Authentic, natural, and potent. Our lab-tested resin form Shilajit 
        provides the energy and vitality needed to conquer the toughest peaks 
        and the hardest workouts.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Bulk Build
      </p>
      <p className="font-normal text-base text-white">Advanced Muscle Gainer</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        The ultimate choice for serious gains. Formulated for those looking 
        to add significant size and strength, making every rep count towards 
        your mass goals.
      </p>
    </div>
  );
};




export function ImageLayoutGrid( {about_us}:{about_us:{url:string,id:number}[] | undefined | []}) {
  const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:  about_us?.[0].url? about_us[0].url : "/imageGrid/img2.png"
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:about_us?.[1].url? about_us[1].url : "/imageGrid/img1.png"
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:about_us?.[2].url? about_us[2].url : "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNlfGVufDB8fDB8fHww"
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:about_us?.[3].url? about_us[3].url : "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV4ZXJjaXNlfGVufDB8fDB8fHww"
  },];
  return (
    <div className="h-screen md:py-5 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}
