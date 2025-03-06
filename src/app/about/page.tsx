import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Dumbbell, Heart, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3112004/pexels-photo-3112004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Gym background"
            fill
            className="object-cover opacity-[.2]"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Fueling Your <span className="text-red-600">Potential</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              We're more than just supplements. We're your partner in the journey to become your best self.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button className="bg-red-600 px-10 hover:bg-red-700">
                Our Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Find a Gym
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Story</h2>
                <div className="mt-2 h-1 w-20 bg-red-600"></div>
                <p className="mt-6 text-lg text-gray-600">
                  Founded in 2010 by a team of fitness enthusiasts and nutritionists, our journey began with a simple
                  mission: to create supplements that actually work, with ingredients you can trust.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  What started as a small operation in a garage has grown into a global brand, but our core values
                  remain the same. We believe in quality, transparency, and results.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  In 2015, we expanded our vision by opening our first gym, creating a complete ecosystem for fitness
                  and nutrition. Today, we operate in 12 countries, helping thousands achieve their fitness goals.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="https://images.pexels.com/photos/3112004/pexels-photo-3112004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Our founders in the lab"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-red-600"></div>
            <p className="mt-6 text-lg text-gray-600">
              These core principles guide everything we do, from formulating our supplements to training our gym staff.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Quality First</h3>
                <p className="mt-4 text-gray-600">
                  We never compromise on ingredients. Every product is rigorously tested to ensure it meets our high
                  standards.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Holistic Approach</h3>
                <p className="mt-4 text-gray-600">
                  We believe in addressing all aspects of fitness—nutrition, training, recovery, and mindset—for optimal
                  results.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">Community</h3>
                <p className="mt-4 text-gray-600">
                  We're building more than a brand—we're creating a community of like-minded individuals supporting each
                  other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What We Offer</h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-red-600"></div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
                <Image
                  src="https://images.pexels.com/photos/1212845/pexels-photo-1212845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium supplements"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <Award className="h-12 w-12 text-white" />
                  <h3 className="mt-4 text-2xl font-bold text-white">Premium Supplements</h3>
                  <p className="mt-2 text-white/90">
                    Science-backed formulations for performance, recovery, and overall health.
                  </p>
                  <Link href="#" className="mt-6 flex items-center text-white hover:underline">
                    Explore our range <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-800/90"></div>
                <Image
                  src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="State-of-the-art gyms"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
                  <Dumbbell className="h-12 w-12 text-white" />
                  <h3 className="mt-4 text-2xl font-bold text-white">State-of-the-art Gyms</h3>
                  <p className="mt-2 text-white/90">
                    Modern facilities with expert trainers to guide your fitness journey.
                  </p>
                  <Link href="#" className="mt-6 flex items-center text-white hover:underline">
                    Find a location <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Our Community Says</h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-red-600"></div>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Customer"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Fitness Competitor</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "Their protein has been my go-to for 3 years now. Clean ingredients, mixes well, and tastes amazing.
                  The results speak for themselves."
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Customer"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Gym Member</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "The trainers at their gyms are next level. They've helped me transform my physique and my confidence
                  in just 6 months."
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Customer"
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Emma Rodriguez</h4>
                    <p className="text-sm text-gray-500">Nutritionist</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  "As a professional in the field, I appreciate their commitment to quality. I recommend their products
                  to all my clients."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <div className="mx-auto mt-2 h-1 w-20 bg-red-600"></div>
            <p className="mt-6 text-lg text-gray-600">The passionate experts behind our products and services.</p>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Dr. James Wilson",
                  role: "Founder & CEO",
                  bio: "Former athlete with a PhD in Nutritional Science",
                },
                {
                  name: "Lisa Chen",
                  role: "Head of Product Development",
                  bio: "Biochemist with 15+ years in supplement formulation",
                },
                {
                  name: "Marcus Johnson",
                  role: "Fitness Director",
                  bio: "Olympic trainer and exercise physiologist",
                },
                {
                  name: "Dr. Sophia Patel",
                  role: "Chief Medical Officer",
                  bio: "Specializes in sports medicine and performance",
                },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto h-48 w-48 overflow-hidden rounded-full">
                    <Image
                      src={`https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-red-600">{member.role}</p>
                  <p className="mt-2 text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join Our Community</h2>
            <p className="mt-6 text-xl text-white/90">
              Start your journey to a stronger, healthier you with our premium supplements and world-class gyms.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="bg-white text-red-600 hover:bg-gray-100">Explore Products</Button>
              {/* <Button variant="outline" className="border-white text-white hover:bg-red-700">
                Find a Gym Near You
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold text-white">About Us</h3>
              <p className="mt-4 text-gray-400">
                Premium nutrition and fitness solutions to help you reach your full potential.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Products</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Protein
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pre-Workout
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Vitamins
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Apparel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gyms</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Membership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Personal Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Classes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-400">1234 Fitness Ave</li>
                <li className="text-gray-400">Muscle City, MC 12345</li>
                <li className="text-gray-400">info@nutritionbrand.com</li>
                <li className="text-gray-400">1-800-NUTRITION</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Nutrition Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

