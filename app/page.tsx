"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/ui/custom/card/home-info-card"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  const imgUrl = "https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8="

  return (
    <Navigation>
      <div className="absolute top-0 left-0 right-0 h-[100vh] bg-cover flex justify-center flex-col" style={{backgroundImage: `url("${imgUrl}")`}}>

        <div className="w-[100%] h-[100%] bg-black opacity-70">
          <div className="flex flex-col text-center mt-[30vh]">
            <span className="text-[90px]">Coding Club AAI</span>
            <span className="text-[25px]">Coding Challenges, live competitions, hackathons, and more</span>
          </div>
        </div>

      </div>

      <div className="px-12 mt-[105vh]">
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
    </Navigation>
  )

}