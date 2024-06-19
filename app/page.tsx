"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/custom/card/home-info-card"
import Footer from "@/components/custom/footer"
import Navigation from "@/components/custom/navigation"

export default function Home() {

  return (
    <Navigation path={"/"}>
      {/* Hero Section */}
      <div className="h-screen bg-cover flex justify-center flex-col bg-[url('/assets/home/background.png')]">
        <div className=" w-full h-full bg-gradient-to-r from-homeGradientStart backdrop-blur-sm" style={{backgroundColor: "rgba(16, 12, 52, 0.8)"}}>
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 self-center mt-[-6rem] ml-40 gap-5">
            <span className="text-6xl mb-[-0.5rem]">
              <span> Learn </span>
              <span className="text-homeEmphasizedText"> code </span>
              <span> by writing </span>
              <span className="text-homeEmphasizedText">code</span>
            </span>
            <span className="text-3xl font-light">Brought to you by AAI Coding Club</span>
            <div className="flex flex-row gap-5">
              <Button className="w-48 rounded-lg bg-homePlayButton text-primary font-bold text-3 text-md hover:bg-homePlayButton/80">Play now</Button>
              <Button className="w-48 rounded-lg bg-transparent border-primary border-2 text-white font-bold text-md hover:text-black">Learn more</Button>
            </div>
          </div>
        </div>
      </div>

      {/* About us Section */}
      <div className="bg-homeAboutUsBg p-14 sawtooth">
        <span></span>
        <img src="/assets/home/about-us.png" className="w-[30rem] rounded-2xl object-cover"/>
      </div>

      {/* Features/What we do section */}
      <div className="bg-homeInfoCardsBg sawtooth2 pb-12">
        <div className="p-14">
          <div className="flex justify-center mb-4">
            <span className="text-3xl">What do we do?</span>
          </div>
          <div className="flex flex-row mb-12">

            <HomeInfoCard title="Hackathons" icon="/assets/home/info-card-icon/hackathons.png">
              We host a hackathon called HackAlliance hosted every year starting in 2024! Students from around Forsyth County can compete by creating an app.
            </HomeInfoCard>

            <HomeInfoCard title="Challenges" icon="/assets/home/info-card-icon/hackathons.png">
              Complete the Python programming challenges on our website to level up your programming skills! 
            </HomeInfoCard>

            <HomeInfoCard title="Stay Notified" icon="/assets/home/info-card-icon/hackathons.png">
              Recieve updates on chapter meetings, hackathons, and more! 
            </HomeInfoCard>
            <HomeInfoCard title="Stay Notified" icon="/assets/home/info-card-icon/hackathons.png">
              Recieve updates on chapter meetings, hackathons, and more! 
            </HomeInfoCard>
          </div>
        </div>
      </div>

      {/* Closing section with call to action*/}
      <div className="bg-homeAboutUsBg pt-12">
        <div className="flex flex-col gap-5 text-center">
          <span className="text-4xl">
            Join now, today!
          </span>
          <span className="text-2xl font-thin w-[36rem] self-center">
            Learn programming in a fun and competitive environment among your peers
          </span>
          <Button className="w-48 rounded-xl bg-homePlayButton text-primary font-bold text-3 text-md hover:bg-homePlayButton/80 self-center mb-12">Play now</Button>
        </div>
        <img src="/assets/home/join-now.png" className="w-full"/>
      </div>
      <Footer/>
    </Navigation>
  )

}