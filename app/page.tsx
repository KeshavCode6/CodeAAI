"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/ui/custom/card/home-info-card"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  return (
    <Navigation>
      <div className="h-screen bg-cover flex justify-center flex-col bg-[url('/assets/home/background.png')]">

        <div className="flex justify-center w-full h-full backdrop-blur-sm" style={{backgroundColor: "rgba(16, 12, 52, 0.8)"}}>
          <div className="flex flex-col text-center absolute top-1/2 -translate-y-1/2 self-center mt-[-6rem]">
            <span className="text-8xl mb-5">Coding Club AAI</span>
            <span className="text-3xl">Coding Challenges, live competitions, hackathons, and more</span>
          </div>
        </div>

      </div>

      <div className="bg-homeAboutUsBg">
        <div className="p-14 flex flex-row">
          <div className="flex flex-col mr-6">
            <span className="text-3xl mb-5">
              About Us
            </span>
            <span className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
          </div>
          <img src="/assets/home/about-us.png" className="w-[30rem] rounded-2xl h-[auto] object-cover"/>
        </div>
      </div>

      <div className="bg-homeInfoCardsBg">

        <div className="p-14">
          <div className="flex flex-row">

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

      
    </Navigation>
  )

}