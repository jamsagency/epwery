"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const CalendlyWidget = dynamic(() => import("@/components/CalendlyWidget"), { ssr: false })

export default function Home() {
  const [activeService, setActiveService] = useState("salesforce")
  const pathname = usePathname()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const navigateAndScroll = useCallback(
    (elementId: string) => {
      const isHomePage = pathname === "/"

      if (!isHomePage) {
        router.push(`/#${elementId}`)
      } else {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [pathname, router],
  )

  useEffect(() => {
    console.log("Home page mounted")
    const sections = ["services", "about-us", "clients"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        console.log(`Section ${id} found`)
      } else {
        console.log(`Section ${id} not found`)
      }
    })
  }, [])

  useEffect(() => {
    const showMessage = (index: number) => {
      setVisibleMessages((prev) => [...prev, index])
    }

    const resetMessages = () => {
      setVisibleMessages([])
    }

    const animationSequence = async () => {
      // Show messages one by one
      for (let i = 1; i <= 4; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        showMessage(i)
      }

      // Wait before resetting
      await new Promise((resolve) => setTimeout(resolve, 2000))
      resetMessages()
    }

    const interval = setInterval(() => {
      animationSequence()
    }, 6000) // Total animation cycle duration

    // Start the animation immediately
    animationSequence()

    return () => clearInterval(interval)
  }, [])

  const services = [
    {
      id: "custom",
      title: "AI & Machine Learning",
      content:
        "We specialize in AI and Machine Learning, leveraging the latest technologies to build intelligent solutions that drive innovation and operational excellence. From predictive analytics to natural language processing, our AI-driven strategies empower businesses to make smarter decisions, automate processes, and unlock new opportunities for growth.",
    },
    {
      id: "dedicated",
      title: "Team Building",
      content:
        "Our Team Building services provide flexible solutions to suit your project needs, offering both full-team integration and staff augmentation. For end-to-end project execution, we assemble dedicated, cross-functional teams that include experienced Project Managers (PMs), skilled Developers, innovative UI/UX Designers, and meticulous Quality Assurance (QA) specialists, ensuring seamless collaboration and high-quality results. Alternatively, through our staff augmentation model, we supply individual team members to enhance your existing workforce, allowing you to fill specific skill gaps and scale resources dynamically while maintaining your team’s workflow and culture.",
    },
    {
      id: "ia",
      title: "Full Stack Web & Mobile Development",
      content:
        "We deliver innovative Full Stack Web and Mobile Development services, creating user-friendly, high-performance applications that drive business success. From intuitive websites to feature-rich mobile apps, our solutions are designed to meet modern market demands, ensuring seamless functionality and a superior user experience across all devices.",
    },
    {
      id: "salesforce",
      title: "Salesforce & Cloud Architecture",
      content:
        "Our expertise in Salesforce and Cloud Architecture ensures businesses can harness the power of cutting-edge technologies to streamline operations, improve scalability, and enhance customer engagement. We design and implement tailored cloud solutions, seamlessly integrating Salesforce into your existing infrastructure to maximize efficiency and foster growth.",
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className="relative pt-32 pb-24 overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 100%, #ffb900, #f15c05 24%, #1d1d1d 47%)",
            color: "transparent",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-600/20 via-transparent to-transparent opacity-40" />

          <div className="container relative z-10 text-center">
            <p
              className="text-orange-500 font-medium mb-6"
              style={{
                backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <span className="font-semibold">PROVEN EXCELLENCE IN</span> <span className="italic">ACTION</span>
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Digital <span className="italic font-normal">Transformation</span> Specialists
            </h1>

            <p className="text-2xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Creating lasting value through expert guidance and execution
            </p>

            <Button
              onClick={() => navigateAndScroll("contact")}
              size="lg"
              className="bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white"
            >
              Unlock success
            </Button>

            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl text-white mb-4">Our numbers don't lie</h2>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-orange-500/30 to-orange-600/30 blur-3xl" />
                <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8 p-8 rounded-2xl backdrop-blur-sm bg-white/5">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">160k</div>
                    <p className="text-sm text-gray-300">hours delivered on the last year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">21,5K</div>
                    <p className="text-sm text-gray-300">active users with access to our apps</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">+80</div>
                    <p className="text-sm text-gray-300">team members dedicated to client projects worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                    <p className="text-sm text-gray-300">client retention rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">10%</div>
                    <p className="text-sm text-gray-300">Employee turnover below</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} id="services" className="pt-24 pb-48">
          <div className="container">
            <div className="max-w-4xl mb-16">
              <p
                className="text-orange-500 text-lg mb-6 font-semibold"
                style={{
                  backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                We don't just offer services; we deliver honest, high-quality solutions.
              </p>
              <h2 className="font-bold text-4xl md:text-5xl text-white mb-8">
                Your success <span className="font-normal italic">is our priority</span>, backed by an{" "}
                <span className="font-normal italic">honest and professional approach.</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                At Epwery, we understand that every project has unique needs. That's why, beyond the range of services
                we provide, our philosophy is clear: always recommend the solution that truly benefits your business. We
                are committed to working with the highest quality standards, keeping your interests at the heart of
                everything we do. Because when you grow, so do we.
              </p>
            </div>

            {/* Desktop Layout (>992px) */}
            <div className="hidden lg:block relative h-[600px]">
              {/* Orange ISO shape */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-services-iso-eu8ThStbSnrE6RdJmVG5cAyMZh5aAj.svg"
                  alt=""
                  width={450}
                  height={450}
                />
              </div>

              {/* AI & Machine Learning */}
              <div className="absolute left-0 top-32 [&[data-state=open]]:z-30">
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[200px]">
                  <AccordionItem value="custom" className="border-none">
                    <AccordionTrigger
                      className="px-4 py-3 text-white hover:no-underline font-bold"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                        borderRadius: "8px",
                      }}
                    >
                      AI & Machine Learning
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                      {services.find((s) => s.id === "custom")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-top-Je3anW1VK3l0AzDLXMxjkNzrG0uP17.svg"
                  alt=""
                  width={203}
                  height={42}
                  className="absolute left-[100px] top-[85px]"
                />
              </div>

              {/* Team Building */}
              <div className="absolute right-32 top-[230px] [&[data-state=open]]:z-30">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-right-top-ouzT5fArd7D500Tlt2kVkyoJpFTFIZ.svg"
                  alt=""
                  width={161}
                  height={45}
                  className="absolute right-[300px] top-[20px]"
                />
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[280px]">
                  <AccordionItem value="dedicated" className="border-none">
                    <AccordionTrigger
                      className="font-bold rounded-lg px-6 py-3 text-white hover:no-underline"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                        borderRadius: "8px",
                      }}
                    >
                      Team Building
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                      {services.find((s) => s.id === "dedicated")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Full Stack Web & Mobile Development */}
              <div className="absolute left-12 top-96 [&[data-state=open]]:z-30">
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[200px]">
                  <AccordionItem value="ia" className="border-none">
                    <AccordionTrigger
                      className="font-bold rounded-lg px-6 py-3 text-white hover:no-underline"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 119%)",
                        borderRadius: "8px",
                      }}
                    >
                      Full Stack Web & Mobile Development
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                      {services.find((s) => s.id === "ia")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-left-bottom-x2yIUFOLljpCxSX3TjHlXdhBA0ImlB.svg"
                  alt=""
                  width={203}
                  height={42}
                  className="absolute left-[100px] top-[-55px]"
                />
              </div>

              {/* Salesforce & Cloud Architecture */}
              <div className="absolute right-0 top-96 [&[data-state=open]]:z-30">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-arrow-right-top-long-RI97s5sBlCpI2tEslro0ABnLeS6Ea5.svg"
                  alt=""
                  width={236}
                  height={58}
                  className="absolute right-[300px] top-[32px]"
                />
                <Accordion type="single" value={activeService} onValueChange={setActiveService} className="w-[280px]">
                  <AccordionItem value="salesforce" className="border-none">
                    <AccordionTrigger
                      className="font-bold rounded-lg px-6 py-3 text-white hover:no-underline"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 101% 47%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 119%)",
                        borderRadius: "8px",
                      }}
                    >
                      Salesforce & Cloud Architecture
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                      {services.find((s) => s.id === "salesforce")?.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Mobile Layout (≤992px) */}
            <div className="lg:hidden">
              <Accordion
                type="single"
                value={activeService}
                onValueChange={setActiveService}
                className="w-full space-y-4"
              >
                {services.map((service) => (
                  <AccordionItem key={service.id} value={service.id} className="border-none">
                    <AccordionTrigger className="bg-zinc-800/50 rounded-lg px-6 py-3 text-white hover:no-underline hover:bg-zinc-800">
                      {service.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-zinc-800/90 mt-2 p-4 rounded-lg text-gray-300 relative z-20">
                      {service.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="bg-[#FF4D00] py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">See Innovation in Action</h2>
                <div className="space-y-6">
                  <p className="text-black text-lg leading-relaxed">
                    Explore how we continuously test and evaluate emerging technologies to uncover their true potential
                    and deliver meaningful value. In this section, you'll find examples of cutting-edge experiments and
                    integrations that go beyond fleeting trends.
                  </p>
                  <p className="text-black text-lg leading-relaxed">
                    For years, our commitment to identifying impactful solutions has set us apart, ensuring we stay
                    ahead without compromising on what truly matters: innovation that makes a difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section ref={aboutUsRef} id="about-us" className="py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <p
                  className="text-lg mb-6 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  The Perfect Nearshore Partner
                </p>
                <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold">
                  Seamless Collaboration, <span className="font-normal italic">Exceptional Value</span>
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p className="text-lg">
                    Located in Uruguay, with most of our developers based in Argentina, EPWERY offers a{" "}
                    <span className="text-white font-semibold">nearshore advantage</span> that makes us the ideal
                    partner for U.S.-based companies. Our similar time zone ensures real-time collaboration, enabling
                    seamless integration with your teams.
                  </p>
                  <p className="text-lg">
                    With development costs approximately{" "}
                    <span className="text-white font-semibold">50% lower than in the U.S.</span>, we deliver
                    high-quality solutions that optimize your budget. Additionally, our{" "}
                    <span className="text-white font-semibold">
                      shared cultural values and work ethic foster clear communication
                    </span>{" "}
                    and alignment, providing a smooth and productive working relationship.
                  </p>
                  <p className="text-lg">
                    This <span className="text-white font-semibold">unique combination of proximity</span>,
                    affordability, and cultural compatibility sets us apart as a trusted partner for your technology
                    needs.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-map-6eRnSKWcYtB7ymagINVFpLzY21UdhV.svg"
                  alt="World map showing EPWERY's global presence"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-12 overflow-hidden bg-zinc-900">
          <h2 className="text-4xl md:text-5xl text-white text-center mb-12">Technology</h2>

          {/* Technology Logos Marquee */}
          <div className="relative mb-4">
            <div className="marquee-container">
              <div className="marquee">
                {[...Array(8)].map((_, setIndex) => (
                  <div key={`set-${setIndex}`} className="flex gap-4">
                    {[
                      { src: "/salesforce.png", alt: "Salesforce" },
                      { src: "/azure.png", alt: "Microsoft Azure" },
                      { src: "/openai.png", alt: "OpenAI" },
                      { src: "/aws.png", alt: "AWS" },
                    ].map((logo, i) => (
                      <div
                        key={`logo-${setIndex}-${i}`}
                        className="flex-shrink-0 flex items-center justify-center bg-zinc-800/50 rounded-lg w-[120px] h-[60px] px-4"
                      >
                        <Image
                          src={logo.src || "/placeholder.svg"}
                          alt={logo.alt}
                          width={100}
                          height={40}
                          className="w-auto h-8 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Technology Logos Marquee (Reverse) */}
          <div className="relative">
            <div className="marquee-container">
              <div className="marquee marquee-reverse">
                {[...Array(8)].map((_, setIndex) => (
                  <div key={`set-${setIndex}`} className="rounded-lg flex gap-4">
                    {[
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/js-P11bfwIQEJwhpT29R2YPlH9rg2l1k4.png",
                        alt: "JavaScript",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stripe-2wNVOi3Kh7QDNJpu8cqdqJKlUIZhiG.png",
                        alt: "Stripe",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neo4j-s7ttZpMpY3UICHuN3sHh284pOmdBIw.png",
                        alt: "Neo4j",
                        bg: "bg-zinc-800/50",
                      },
                      {
                        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-JkgWiLA77Cxk3IfxUW6bTXC8VJgkbg.png",
                        alt: "Python",
                        bg: "bg-zinc-800/50",
                      },
                    ].map((logo, i) => (
                      <div
                        key={`logo-${setIndex}-${i}`}
                        className={`flex-shrink-0 flex items-center justify-center ${logo.bg} rounded-lg w-[120px] h-[60px] px-4`}
                      >
                        <Image
                          src={logo.src || "/placeholder.svg"}
                          alt={logo.alt}
                          width={100}
                          height={40}
                          className="w-auto h-8 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Engineers Section */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="max-w-xl">
                <p
                  className="text-lg mb-6 font-semibold"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f15c05 37%, #ffb900 67%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  A Partner Who Truly Understands Technology
                </p>
                <h2 className="text-4xl md:text-5xl text-zinc-900 mb-8 font-bold">
                  Engineers, <span className="font-normal italic">Not</span>
                  <br />
                  <span className="font-normal italic">Salespeople.</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    At EPWERY, what sets us apart is that we're led by engineers, not salespeople. From your very first
                    contact, you'll engage in an honest and knowledgeable conversation with our founders—seasoned
                    technology experts who understand your challenges and can provide tailored recommendations.
                  </p>
                  <p className="text-zinc-600 text-lg leading-relaxed">
                    You won't need to navigate through layers of sales representatives to get clear answers about
                    technical or commercial aspects. We're committed to building trust from day one, encouraging you to
                    test us out and experience the value we bring firsthand.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8"
                    >
                      Explore now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative pt-8">
                <div className="relative h-[600px]">
                  <Image
                    src="/message-1.svg"
                    alt="Message 1"
                    width={350}
                    height={85}
                    className={`absolute top-0 transition-opacity duration-500 ${
                      visibleMessages.includes(1) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-2.svg"
                    alt="Message 2"
                    width={350}
                    height={85}
                    className={`absolute top-[90px] right-0 transition-opacity duration-500 ${
                      visibleMessages.includes(2) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-3.svg"
                    alt="Message 3"
                    width={350}
                    height={85}
                    className={`absolute top-[260px] transition-opacity duration-500 ${
                      visibleMessages.includes(3) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/message-4.svg"
                    alt="Message 4"
                    width={350}
                    height={85}
                    className={`absolute top-[370px] right-0 transition-opacity duration-500 ${
                      visibleMessages.includes(4) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section ref={clientsRef} id="clients" className="relative py-24 bg-zinc-900 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clients-bg-7xNLxDolC0ps8b2jttAZtOem9i5fLr.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-white mb-8 font-bold">What our clients are saying</h2>
              <p className="text-lg text-gray-300">
                Our commitment to excellence and client satisfaction speaks through the success stories of those who've
                partnered with us. Here's what some of our valued clients have to share about their experience working
                with EPWERY.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/C4E03AQG004hqX_ADrg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1638284298104?e=1744848000&v=beta&t=ymuiQ2xTCkYmASHYtZdTQw9EXM1nVNINO6noztFEEVg"
                      alt="John Smith"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "Epwery helped us get a world class software team up and running in record time. The team is highly
                    skilled and versatile and has become a great extension to our onsite full time employees."
                  </p>
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-zinc-900">Vinay Gidwaney</p>
                  <p className="text-zinc-500">Entrepreneur and advisor</p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D5603AQGgiKfMv5e28Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729624869853?e=1744848000&v=beta&t=BY5U4ehSDOU5StL-Tzt1JY_1QExBBSP-IP0RFFxRBaE"
                      alt="Sarah Chen"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "With strong engineering and a business-first mindset, they excel at crafting MVPs and scaling
                    products. Their leadership and practical architecture make them invaluable for product businesses."
                  </p>
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-zinc-900">Poonam Kalinani</p>
                  <p className="text-zinc-500">Chief Product Officer</p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-8 pt-14 relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/C5603AQF-13tyiwjybQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1657300368033?e=1744848000&v=beta&t=jIovGveIgqDOC5nXUK1LXrSzcNoDnFr4FLAv02Zj7Ng"
                      alt="Michael Rodriguez"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="text-center mb-6">
                  <p className="text-zinc-600 leading-relaxed">
                    "Our exceptional EPWERY team is fully dedicated to Ansel’s success, embracing our mission and values
                    while driving rapid innovation from ideation to market—a true competitive edge."
                  </p>
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-zinc-900">Veer Gidwaney</p>
                  <p className="text-zinc-500">CEO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section ref={contactRef} id="contact" className="relative py-24 bg-zinc-900 overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/schedule-bg-OnzJmcvjdRmUDqneGrjZgbCmB1CPg4.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="container relative z-10">
            <h2 className="text-4xl md:text-5xl text-white text-center mb-16 font-bold">
              Schedule a free 30-minute consultation
            </h2>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
              <CalendlyWidget />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

