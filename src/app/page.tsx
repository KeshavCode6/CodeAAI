"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardTitle } from "@/components/ui/card"
import { GlobeIcon } from "lucide-react"
import { infoCards, teamMembers, faqs } from "@/lib/constants"

// TODO: Fix?
import Footer from "@/components/Footer" 
import { Navbar } from "@/components/Navigation"
import ScrollableSection from "@/components/ScrollableSection"
// Landing page
export default function Landing() {


  return (
    <Navbar path="/">
      {/* Hero Section */}
      <div className="h-screen bg-cover flex justify-center flex-col bg-[url('/assets/background.png')]">
        <div className=" w-full h-full bg-gradient-to-r from-homeGradientStart backdrop-blur-sm" style={{ backgroundColor: "rgba(16, 12, 52, 0.8)" }}>
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 self-center mt-[-6rem] ml-40 gap-5">
            <span className="text-6xl mb-[-0.5rem] font-bold">
              <span> Learn </span>
              <span className="text-[#0083CD]"> code </span>
              <span> by writing </span>
              <span className="text-[#0083CD]">code</span>
            </span>
            <span className="text-3xl font-light">Brought to you by AAI Coding Club</span>
            <div className="flex flex-row gap-5">
              <Link href="/dashboard">
                <Button className="w-48 rounded-xl text-white">Play now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-48 rounded-lg text-white">About us</Button>
              </Link>
            </div>
          </div>
        </div>
        <span id="about" />
      </div>

      {/* About us Section */}
      <div className="bg-darkBlue py-16 pb-32 sawtooth2 flex justify-center items-center">
        <ScrollableSection className=" flex flex-row items-center gap-20">

          <div className="flex flex-col w-[30vw] gap-5">
            <span className="text-3xl  font-bold mt-4">What do we do?</span>
            <span className="text-lg mt-[-12px]">
              Full disclosure, this site does not have real content yet.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">

            {infoCards.map((infoCard, index) => (
              <Card className="w-56 aspect-square grow text-center flex items-center justify-center relative transition-all duration-300 hover:scale-105 hover:bg-primary hover:bg-opacity-75 group" key={index}>
                {/* Icon and Title */}
                <div className="flex flex-col items-center justify-center gap-2 z-0 transition-opacity duration-300 group-hover:opacity-15">
                    <img src={infoCard.iconUrl} className="w-32 rounded-full self-center" />
                    <CardTitle className="text-lg">{infoCard.title}</CardTitle>
                </div>

                {/* Children (Overlay) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 p-4 flex items-center justify-center transition-opacity duration-300 z-20">
                  <span>
                    {infoCard.description}
                  </span>
                </div>
              </Card>
            ))}
            <span id="contact" />
          </div>
        </ScrollableSection>
      </div>

      {/* Meet the team */}
      <div className="bg-lightBlue sawtooth py-16">
        <ScrollableSection className="flex flex-col items-center  px-4 md:px-8">
          <h2 className="text-3xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Meet Our Team</h2>
          <div className="flex flex-wrap gap-8 md:gap-16 mb-20">

            {teamMembers.map((teamMember, index) => (
              <div className="flex flex-col items-center transition-all duration-300 hover:transform hover:scale-105" key={index}>
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg mb-6">
                    <img
                        className="w-full h-full object-cover"
                        src={teamMember.imageUrl}
                        alt={teamMember.name}
                    />
                </div>
                <span className="font-bold text-2xl mb-2">{teamMember.name}</span>
                <span className="font-semibold text-lg text-primary text-center">{teamMember.role}</span>
                <div className="mt-4 flex gap-4">
                    {teamMember.url ? (
                        <a target="_blank" href={teamMember.url} className="text-gray-600 hover:text-primary">
                            <GlobeIcon />
                        </a>
                    ) : <></>}
    
                    <a target="_blank" href={teamMember.githubUrl} className="text-gray-600 hover:text-primary">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
              </div>
            ))}
          </div>
          <span id="faqs" />
        </ScrollableSection>
      </div>

      {/* FAQ Section*/}
      <div className="bg-darkBlue sawtooth2 py-16">
        <ScrollableSection className="w-full mb-16 text-white p-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold  text-center">FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-primary">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollableSection>
      </div>

      {/* Closing section with call to action*/}
      <div className="bg-lightBlue">
        <ScrollableSection>

          <div className="flex flex-col gap-5 text-center pt-32">
            <span className="text-4xl">
              Join now, today!
            </span>
            <span className="text-2xl font-thin w-[36rem] self-center">
              Learn programming in a fun and competitive environment among your peers
            </span>
            <Button onClick={() => { location.href = "/dashboard" }} className="w-[20rem] self-center my-8 grow text-white">Start now</Button>
          </div>
        </ScrollableSection>

        <img src="/assets/join-now.png" className="w-full" />

      </div>

      <Footer />
    </Navbar>
  )

}