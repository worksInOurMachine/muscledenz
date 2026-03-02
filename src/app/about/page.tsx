import Image from "next/image"
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles, Check, Activity, Dumbbell, TrendingUp, Zap, Flame } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Gentle Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <Image
            src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Gym lifestyle background"
            fill
            className="object-cover object-top filter grayscale opacity-20"
            priority
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-8 border border-red-100">
              <Sparkles className="h-4 w-4" />
              <span>Est. January 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.15]">
              Real fitness needs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400 font-bold">
                honest nutrition.
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We believe wellness shouldn't be complicated. By blending modern clinical research with deeply rooted Ayurvedic wisdom, we create supplements you can actually trust.
            </p>

            <div className="mt-10">
              <Link href={"/products"} className="bg-red-600 text-white rounded-full px-8 py-4 text-base font-medium hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Explore our collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Human Story Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                  <Image
                    src={"/mh.jpeg"}
                    alt="Authentic gym training"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative blob behind image */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gray-100 rounded-full blur-3xl -z-10"></div>

                {/* Floating stat card */}
                <div className="absolute bottom-10 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-20 max-w-xs hidden sm:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-50 p-3 rounded-full text-red-600">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Our Motivation</p>
                      <p className="text-gray-900 font-semibold">Everyday people striving for better.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                    MUSCLEDENZ's journey started in the gym.
                  </h2>
                  <div className="w-12 h-1 bg-red-600 mt-6 rounded-full"></div>
                </div>

                <div className="prose prose-lg text-gray-600">
                  <p>
                    We opened our fitness space in October 2021 and worked closely with real people, including beginners, gym lovers, and athletes. We all had the same problem:
                  </p>
                  <p className="font-medium text-gray-900 p-2">
                    Either the supplements were too expensive or they weren't reliable.
                  </p>
                  <p>
                    The official launch of MUSCLEDENZ took place in January 2025, and it had a clear goal:
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    In India, we want to sell high-quality nutraceutical and Ayurvedic products at low prices.
                  </p>
                  <p>
                    We carefully picked scientifically proven ingredients and mixed them with Ayurvedic ones that we know work to make products that help:
                  </p>
                  <ul className="space-y-2 mt-4 font-medium">
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-red-600" /> Building muscle</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-red-600" /> Power and performance</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-red-600" /> Losing weight</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-red-600" /> Energy from nature</li>
                    <li className="flex items-center gap-2"><Check className="h-5 w-5 text-red-600" /> Wellness as a whole</li>
                  </ul>
                  <p className="text-gray-900 font-medium text-xl border-l-4 border-red-200 pl-4 py-2 mt-8 italic">
                    MUSCLEDENZ stands for power, performance, and purity today.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Purpose-Built Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Purpose-built for your journey.</h2>
            <p className="text-lg text-gray-600">
              Each product in our flagship line has been thoughtfully designed to support specific aspects of your wellness and performance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Bulk Build Muscle Gainer",
                desc: "muscledenz massive muscle ayurvedic weight gainer for men and women.",
                icon: Dumbbell,
                bgColor: "bg-amber-50",
                iconColor: "text-amber-600"
              },
              {
                title: "Massive Muscle Weight Gainer",
                desc: "A balanced formula to help you safely achieve healthy weight gain and overall volume.",
                icon: TrendingUp,
                bgColor: "bg-emerald-50",
                iconColor: "text-emerald-600"
              },
              {
                title: "Creatine HCl + Nitrate",
                desc: "Enhanced absorption for raw, explosive power and better athletic performance.",
                icon: Zap,
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600"
              },
              {
                title: "Fat Burner",
                desc: "A natural blend designed to support healthy weight management and active fat loss.",
                icon: Flame,
                bgColor: "bg-rose-50",
                iconColor: "text-rose-600"
              },
              {
                title: "Pure Shilajit",
                desc: "Sourced purely to provide your body with deep, natural energy, stamina, and vitality.",
                icon: Activity,
                bgColor: "bg-indigo-50",
                iconColor: "text-indigo-600"
              },
              {
                title: "ALOEFIT Aloe Vera Juice",
                desc: "A daily ritual for gentle detoxifying, digestive health, and inner balance.",
                icon: Leaf,
                bgColor: "bg-teal-50",
                iconColor: "text-teal-600"
              }
            ].map((product, idx) => (
              <div key={idx} className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${product.bgColor} flex items-center justify-center mb-6`}>
                  <product.icon className={`h-7 w-7 ${product.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
                <p className="text-gray-600 leading-relaxed">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Promises */}
      <section className="py-24 bg-white text-gray-900 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-full h-full opacity-50 select-none pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-50 rounded-full blur-[100px]"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16">

              <div className="lg:col-span-5 space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Doing things the right way.
                </h2>
                <p className="text-xl text-gray-600">
                  At MUSCLEDENZ, we believe in deep roots and smart innovation. We don't cut corners because we know real bodies are relying on our products.
                </p>
                <div className="space-y-5 pt-4">
                  {[
                    "Premium, hand-selected raw materials",
                    "Formulas backed by clinical science",
                    "Honest pricing for everyday people",
                    "Authentic results without the marketing fluff"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1 bg-red-50 p-1 rounded-full text-red-600 border border-red-100">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-lg text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-gray-100 shadow-xl shadow-gray-200/40 p-8 sm:p-12 rounded-3xl h-full flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-red-50 rounded-full blur-2xl -z-10"></div>
                <ShieldCheck className="h-10 w-10 text-red-500 mb-6" />
                <h3 className="text-3xl font-semibold mb-6">Our Promise to You</h3>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Whether you're stepping into the gym for the first time to lose a few pounds, or you're an athlete pushing for a new personal best, we are here to support your transformation.
                </p>
                <p className="text-2xl text-gray-900 font-medium">
                  We promise to help you find better strength, better confidence, and better performance.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Build with confidence. <br />
              <span className="text-red-600">Build with MUSCLEDENZ.</span>
            </h2>
            <p className="text-xl text-gray-500">
              Join a community that values honest health and real results.
            </p>
        {/*     <div className="pt-4">
              <Button className="bg-gray-900 text-white rounded-full px-10 py-6 text-lg hover:bg-gray-800 transition-colors">
                Start your journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </div>
      </section>

    </div>
  )
}
