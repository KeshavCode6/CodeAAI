"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/ui/custom/card/home-info-card"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  const imgUrl = "https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8="

  return (
    <Navigation>
      <div className="h-[90vh] bg-cover flex justify-center flex-col" style={{backgroundImage: `url("${imgUrl}")`}}>

        <div className="w-[100%] h-[100%] bg-black opacity-70">
          <div className="flex flex-col text-center mt-[30vh]">
            <span className="text-[90px]">Coding Club AAI</span>
            <span className="text-[25px]">Coding Challenges, live competitions, hackathons, and more</span>
          </div>
        </div>

      </div>

      <Card className="m-[10px]">

        <div className="flex flex-row">
          <div>
            <CardHeader>
              <CardTitle>
                About Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </CardContent>
          </div>

          <div className="p-[10px]">
            <img src={`/assets/home-about-us.png`} className="rounded-[10px] w-[50vh] m-[10px] float-end" style={{filter: "brightness(0.8)"}}/>
          </div>
        </div>

      </Card>

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

      </div>

    </Navigation>
  )

}