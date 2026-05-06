import Image from "next/image"
import { ArrowRight, Check, MapPin, Target, Lightbulb, ShieldCheck, Heart, Award, CheckCircle2, ShoppingBag, Globe, Mail, Phone } from "lucide-react"
import Link from "next/link"
//import { ImageLayoutGrid } from '@/components/ImageGridLayout/ImageGridLayout';

//const API_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

/* async function fetchFromApi(endpoint: string, query = '') {
  try {
    const res = await fetch(`${API_URL}/api/${endpoint}${query}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch from ${endpoint}: ${res.statusText}`);
      return { data: null };
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return { data: null };
  }
} */

function SectionHeader({ title, subtitle, align = 'left', light = false }: { title: string; subtitle?: string; align?: 'left' | 'center', light?: boolean }) {
  if (align === 'center') {
    return (
      <div className="text-center space-y-4 mb-16 animate-reveal">
        <h2 className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] ${light ? 'text-white' : 'text-foreground'}`}>
          {title.split(' ').map((word, i) => (
            <span key={i} className={i % 2 !== 0 ? "text-primary italic" : ""}>{word} </span>
          ))}
        </h2>
        {subtitle && (
          <p className={`${light ? 'text-white/60' : 'text-muted-foreground'} text-lg sm:text-xl max-w-3xl mx-auto font-medium`}>{subtitle}</p>
        )}
        <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-primary" />
      </div>
    );
  }

  return (
    <div className="mb-10 animate-reveal">
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] flex flex-col gap-2 ${light ? 'text-white' : 'text-foreground'}`}>
        {title}
        <span className="h-1.5 w-16 bg-primary rounded-full" />
      </h2>
      {subtitle && (
        <p className={`${light ? 'text-white/60' : 'text-muted-foreground'} text-base sm:text-lg mt-4 font-medium max-w-3xl`}>{subtitle}</p>
      )}
    </div>
  );
}

export default async function AboutUs() {
  /*   const homePage = await fetchFromApi('homepage', '?populate=*');
    const homePageData = homePage?.data; */

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Gym lifestyle background"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-8 border border-primary/30 backdrop-blur-md animate-reveal">
            <Award size={14} className="fill-primary" />
            <span>Premium Health & Nutrition</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.8] mb-8 animate-reveal">
            About <span className="text-primary italic">Muscledenz</span>
          </h1>

          <p className="text-white/80 text-lg sm:text-2xl max-w-4xl mx-auto font-medium leading-relaxed mb-6 animate-reveal" style={{ animationDelay: '0.1s' }}>
            Muscledenz Pvt. Ltd. is a premium health and nutrition brand committed to redefining fitness and wellness through high-quality supplements and Ayurvedic formulations.
          </p>
          <p className="text-white/60 text-base sm:text-lg max-w-3xl mx-auto font-medium leading-relaxed mb-10 animate-reveal" style={{ animationDelay: '0.15s' }}>
            Built with a vision to deliver clean, effective, and reliable nutrition, Muscledenz blends modern scientific advancements with the rich heritage of Ayurveda—creating products that support both performance and overall well-being.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <Link href="/products" className="btn-premium">
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Our Story ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className=" group relative">
              <div className="aspect-[4/2]">
                <Image
                  src="/about-page-images/ab01.jpeg"
                  alt="Our Story"
                  fill
                  className="object-cover group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/*             <div className="relative group animate-reveal">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-2xl relative z-10">
                <Image
                  src="/about-page-images/ab01.jpeg"
                  alt="Our Story"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>
 */}
            <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
              <SectionHeader
                title="Our Story"
                subtitle="Founded with a simple yet powerful purpose — to offer trusted, high-performance supplements in a market where quality and transparency are often compromised."
              />

              <div className="prose prose-lg text-muted-foreground font-medium space-y-6">
                <p>
                  Recognizing the growing demand for authentic, result-oriented nutrition, we set out to create a brand that people can rely on — whether they are fitness enthusiasts, athletes, or individuals focused on everyday health.
                </p>
                <p>
                  Today, <span className="text-foreground font-black">Muscledenz stands as a symbol of quality, consistency, and customer trust</span>, serving a wide audience across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Philosophy ─── */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(255,0,0,0.1),transparent)]" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <SectionHeader
            title="Our Philosophy"
            subtitle="We believe that true fitness is a balance of strength, nutrition, and natural wellness."
            align="center"
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20">
            {[
              { title: "Muscle Performance", desc: "Support muscle performance and recovery", icon: <Target size={32} /> },
              { title: "Overall Health", desc: "Promote overall health and vitality", icon: <Heart size={32} /> },
              { title: "Science + Ayurveda", desc: "Combine modern nutrition with Ayurvedic ingredients", icon: <Lightbulb size={32} /> },
              { title: "Clean Formulations", desc: "Maintain a clean and responsible formulation approach", icon: <ShieldCheck size={32} /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-left animate-reveal flex flex-col gap-4" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-primary">{item.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/60 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Images (From API) ─── */}
      {/*       {homePageData?.about_images && homePageData.about_images.length > 0 && (
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              title="Beyond The Limits"
              subtitle="See how Muscledenz is transforming fitness journeys everywhere."
              align="center"
            />
          </div>
          <ImageLayoutGrid about_us={homePageData.about_images} />
        </section>
      )} */}

      {/* ─── Our Product Portfolio ─── */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Product Portfolio"
            subtitle="Our carefully curated range is designed to meet diverse fitness and wellness needs."
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            {[
              { name: "Advanced Creatine", badge: "HCl Nitrate Blend", desc: "Designed for better absorption and performance support" },
              { name: "Bulk Build Mass Gainer", badge: "Mass Builder", desc: "Supports healthy weight and muscle development" },
              { name: "Ayurvedic Gainer", badge: "Natural Weight Gain", desc: "A natural approach to weight gain using traditional herbs" },
              { name: "Pure Shilajit", badge: "Strength & Vitality", desc: "Known in Ayurveda for strength and vitality support" },
              { name: "Fat Burner Formula", badge: "Active Lifestyle", desc: "Supports active lifestyle goals with proper diet & exercise" },
              { name: "ALOEFIT Aloe Vera Juice", badge: "Wellness", desc: "Daily detox and wellness support" }
            ].map((product, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-background border border-border shadow-sm hover:shadow-xl transition-shadow animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <ShoppingBag className="text-primary mb-6" size={32} />
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full mb-4">
                  {product.badge}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{product.name}</h3>
                <p className="text-muted-foreground font-medium">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quality & Why Us ─── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8 animate-reveal">
              <SectionHeader title="Quality & Compliance" subtitle="At Muscledenz, quality is not a claim — it is a commitment." />
              <div className="space-y-4 pt-4">
                {[
                  "FSSAI Central Licensed Brand",
                  "Lab-Tested Products for quality and consistency",
                  "Strict Quality Control Measures at every stage",
                  "Carefully Selected Ingredients",
                  "Transparent Labeling Practices"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-foreground font-bold uppercase text-xs md:text-sm tracking-widest">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground font-medium italic border-l-4 border-primary pl-4 mt-6">
                We ensure that every product reflects our dedication to safety, purity, and performance.
              </p>
            </div>

            <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
              <SectionHeader title="Why Muscledenz?" />
              <div className="space-y-6 pt-4">
                {[
                  { title: "Premium Quality Positioning", desc: "Crafted for customers who value excellence" },
                  { title: "Balanced Formulations", desc: "Science + Ayurveda synergy" },
                  { title: "Wide Audience Focus", desc: "Fitness users, beginners, and general wellness seekers" },
                  { title: "Clean & Responsible Approach", desc: "No unnecessary or misleading claims" },
                  { title: "Customer Trust First", desc: "Long-term relationships over short-term marketing" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1">
                      <Check size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-black uppercase tracking-widest">{item.title}</h4>
                      <p className="text-muted-foreground font-medium text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 text-center animate-reveal">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Our Vision</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                To establish Muscledenz as a globally recognized premium wellness brand known for quality, innovation, and trust.
              </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 text-center animate-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Our Mission</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                To empower individuals with effective, safe, and high-quality nutrition solutions that help them achieve their fitness and wellness goals confidently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Corporate Info & Availability ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">

            <div className="space-y-8 animate-reveal">
              <SectionHeader title="Availability" subtitle="Muscledenz products are easily accessible across leading online platforms:" />
              <div className="flex flex-wrap gap-4">
                {["Amazon", "Flipkart", "Meesho"].map((store, i) => (
                  <div key={i} className="px-6 py-3 bg-muted rounded-xl border border-border/50 font-black uppercase tracking-widest text-sm hover:border-primary transition-colors cursor-default">
                    {store}
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <p className="text-muted-foreground font-medium mb-4">Along with our official website:</p>
                <Link href="/" className="inline-flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-xl font-black uppercase tracking-widest hover:bg-primary/90 transition-colors">
                  <Globe size={20} /> www.muscledenz.com
                </Link>
              </div>
            </div>

            <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.2s' }}>
              <SectionHeader title="Corporate Info" />
              <div className="bg-muted p-8 rounded-[2rem] border border-border/50 space-y-6">
                <div>
                  <h4 className="font-black text-xl uppercase tracking-tighter text-foreground mb-1">Muscledenz Pvt. Ltd.</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase text-xs tracking-widest">Marketing Office</p>
                      <p className="text-muted-foreground font-medium text-sm mt-1">Mandsaur, Madhya Pradesh, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase text-xs tracking-widest">Manufacturing</p>
                      <p className="text-muted-foreground font-medium text-sm mt-1">India (Under certified facilities)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase text-xs tracking-widest">Email</p>
                      <a href="mailto:denzmuscle@gmail.com" className="text-muted-foreground font-medium text-sm mt-1 hover:text-primary transition-colors">denzmuscle@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-primary shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold uppercase text-xs tracking-widest">Contact</p>
                      <a href="tel:7693017906" className="text-muted-foreground font-medium text-sm mt-1 hover:text-primary transition-colors">+91 7693017906</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
