"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/ui/custom/card/home-info-card"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  return (
    <Navigation>
      <div className="h-[100vh] bg-cover flex justify-center flex-col bg-[url('/assets/home-background.png')] mt-[-20px]">

        <div className="flex justify-center w-[100%] h-[100%] backdrop-blur-[5px]" style={{backgroundColor: "rgba(16, 12, 52, 0.8)"}}>
          <div className="flex flex-col text-center absolute top-1/2 -translate-y-1/2 self-center mt-[-60px]">
            <span className="text-[90px]">Coding Club AAI</span>
            <span className="text-[25px]">Coding Challenges, live competitions, hackathons, and more</span>
          </div>
        </div>

      </div>

      <div className="bg-homeAboutUsBg">
        <div className="p-[50px] flex flex-row">
          <img src="/assets/home-about-us.png" className="w-[500px] rounded-[15px]"/>
          <div className="flex flex-col ml-[50px]">
            <span className="text-[50px]">About Us</span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="bg-homeInfoCardsBg">

        <div className="p-[50px]">
          <div className="flex flex-row">

            <HomeInfoCard title="Hackathons">
              We host a hackathon called HackAlliance hosted every year starting in 2024! Students from around Forsyth County can compete by creating an app.
            </HomeInfoCard>

            <HomeInfoCard title="Challenges">
              Complete the Python programming challenges on our website to level up your programming skills! 
            </HomeInfoCard>

            <HomeInfoCard title="Stay Notified">
              Recieve updates on chapter meetings, hackathons, and more! 
            </HomeInfoCard>
            <HomeInfoCard title="Stay Notified">
              Recieve updates on chapter meetings, hackathons, and more! 
            </HomeInfoCard>
          </div>
        </div>

      </div>

      
    </Navigation>
  )

}