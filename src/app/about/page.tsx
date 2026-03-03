import Image from "next/image"
import { ArrowRight, Leaf, ShieldCheck, Check, Activity, Dumbbell, TrendingUp, Zap, Flame, Sparkles, MapPin, Users } from "lucide-react"
import Link from "next/link"

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
          <p className={`${light ? 'text-white/60' : 'text-muted-foreground'} text-lg sm:text-xl max-w-2xl mx-auto font-medium`}>{subtitle}</p>
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

export default function AboutUs() {
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
            <Sparkles size={14} className="fill-primary" />
            <span>Built by Athletes, for Athletes</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.8] mb-8 animate-reveal">
            Honest Nutrition. <br />
            <span className="text-primary italic">Real Results.</span>
          </h1>

          <p className="text-white/80 text-lg sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-10 animate-reveal" style={{ animationDelay: '0.1s' }}>
            We started MuscleDenz in our own gym because we were tired of supplements that overpromised and under-delivered. Today, we bring that same local commitment to you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <Link href="/products" className="btn-premium">
              See Our Range <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Our Human Story ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative group animate-reveal">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-2xl relative z-10">
                <Image
                  src="/mh.jpeg"
                  alt="Training at Olympic Gym"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 rounded-3xl shadow-2xl z-20 max-w-xs hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wider">The Community</p>
                    <p className="text-xs text-muted-foreground font-medium">Where every rep counts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
              <SectionHeader 
                title="From the Gym Floor" 
                subtitle="We didn't start in a boardroom. We started with the sound of plates hitting the floor." 
              />
              
              <div className="prose prose-lg text-muted-foreground font-medium space-y-6">
                <p>
                  It began in October 2021. As we trained alongside the community at <span className="text-foreground font-bold">Olympic Gym Mandsaur</span>, we saw the struggle firsthand: athletes wanting to grow but being held back by supplements that were either way too expensive or simply unreliable.
                </p>
                <p>
                  We took it personally. In January 2025, MuscleDenz was officially born with a simple promise: 
                  <span className="text-foreground font-black"> Quality you can trust, at a price that respects your hustle.</span>
                </p>
                
                <div className="space-y-4 pt-4">
                  {[
                    "Hand-selected ingredients we use ourselves",
                    "No marketing fluff, just science and results",
                    "Rooted in both performance & Ayurvedic wisdom",
                    "Tested in the real world, by real athletes"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Check size={20} />
                      </div>
                      <span className="text-foreground font-bold uppercase text-xs tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What We Stand For (Human Values) ─── */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(255,0,0,0.1),transparent)]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <SectionHeader 
            title="The MuscleDenz Promise" 
            subtitle="We treat every customer like one of our own local athletes." 
            align="center"
            light
          />

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mt-20">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 text-left animate-reveal">
              <ShieldCheck size={40} className="text-primary mb-6" />
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Total Integrity</h3>
              <p className="text-white/60 font-medium leading-relaxed italic">
                "If we wouldn't take it ourselves, we won't sell it to you. Every batch is FSSAI certified and lab-tested for the purity your body deserves."
              </p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 text-left animate-reveal" style={{ animationDelay: '0.1s' }}>
              <Activity size={40} className="text-primary mb-6" />
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Your Transformation</h3>
              <p className="text-white/60 font-medium leading-relaxed italic">
                "Whether it's your first day in the gym or your thousandth, we're here to fuel your better version. Science-backed, community-tested."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Section: Where it began ─── */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-reveal">
              <SectionHeader 
                title="Find Us At Home" 
                subtitle="The birthplace of MuscleDenz. Come visit where the journey started." 
              />
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-muted rounded-[2rem] border border-border/50">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-foreground">Olympic Gym Mandsaur</h4>
                    <p className="text-muted-foreground font-medium text-sm mt-1">Mandsaur, Madhya Pradesh, India</p>
                  </div>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  MuscleDenz was born from the energy of this local gym. We keep our roots close and our standards high, ensuring that every product we launch carries the same spirit of hard work and community we found here.
                </p>
                <Link 
                  href="https://www.google.com/maps/place/Olympic+Gym+Mandsaur/@24.0857255,75.0674287,17z" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all"
                >
                  Get Directions <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="h-[450px] rounded-[3rem] overflow-hidden border border-border shadow-2xl animate-reveal" style={{ animationDelay: '0.1s' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.751351185523!2d75.0674287!3d24.0857255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39642d38a16d8c4f%3A0x5b170faa586556b3!2sOlympic%20Gym%20Mandsaur!5e0!3m2!1sen!2sin!4v1709472300000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center space-y-10">
          <SectionHeader 
            title="Join the Family" 
            subtitle="Build with confidence. Build with someone who knows the grind." 
            align="center"
            light
          />
          <Link href="/products" className="btn-premium">
            Shop Our Products <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
