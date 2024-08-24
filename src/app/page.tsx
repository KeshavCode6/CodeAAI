"use client"
import { Button } from "@/components/ui/button"
import HomeInfoCard from "@/components/custom/landing/HomeInfoCard"
import Footer from "@/components/custom/general/footer"
import Navigation from "@/components/custom/general/navigation"
import Link from "next/link"
import { faqs, members } from "@/lib/constants"
import TeamCard from "@/components/custom/landing/TeamCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ScrollableSection from "@/components/custom/general/scrollableSection"

// Landing page
export default function Landing() {

  return (
    <Navigation path={"/"}>
      {/* Hero Section */}
      <div className="h-screen bg-cover flex justify-center flex-col bg-[url('/assets/home/background.png')]">
        <div className=" w-full h-full bg-gradient-to-r from-homeGradientStart backdrop-blur-sm" style={{ backgroundColor: "rgba(16, 12, 52, 0.8)" }}>
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 self-center mt-[-6rem] ml-40 gap-5">
            <span className="text-6xl mb-[-0.5rem]">
              <span> Learn </span>
              <span className="text-[#0083CD]"> code </span>
              <span> by writing </span>
              <span className="text-[#0083CD]">code</span>
            </span>
            <span className="text-3xl font-light">Brought to you by Keshav Shah and Shaurya Kumar</span>
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
            <HomeInfoCard title="Hackathons" icon="/assets/home/info-card-icon/hackathons.png">
              Participate in exciting hackathons with top-tier developers from around the globe. Collaborate, create, and compete for amazing prizes!
            </HomeInfoCard>

            <HomeInfoCard title="Challenges" icon="/assets/home/info-card-icon/hackathons.png">
              Take on various coding challenges designed to push your skills to the next level. Tackle problems and earn rewards as you grow.
            </HomeInfoCard>

            <HomeInfoCard title="Competition" icon="/assets/home/info-card-icon/hackathons.png">
              Engage in friendly competition with like-minded individuals. Hone your skills and become a leader in your field!
            </HomeInfoCard>

            <HomeInfoCard title="Stay Notified" icon="/assets/home/info-card-icon/hackathons.png">
              Stay informed about the latest events, challenges, and competitions. Never miss an opportunity to shine!
            </HomeInfoCard>
          </div>
        </ScrollableSection>
      </div>

      {/* Meet the team */}
      <div className="bg-lightBlue sawtooth py-16">
        <span id="contact" />
        <ScrollableSection className="flex flex-col items-center  px-4 md:px-8">
          <h2 className="text-3xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-20">
            {members.map((member, index) => (
              <TeamCard key={index} name={member.name} image={member.image} github={member.github} url={member.url} role={member.role} />
            ))}
          </div>
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

        <img src="/assets/home/join-now.png" className="w-full" />

      </div>

      <Footer />
    </Navigation>
  )

}