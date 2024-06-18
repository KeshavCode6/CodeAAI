"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInfoCard from "@/components/ui/custom/card/home-info-card"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  return (
    <Navigation>
      <div className="h-screen bg-cover flex justify-center flex-col bg-[url('/assets/home/background.png')]">

        <div className=" w-full h-full bg-gradient-to-r from-homeGradientStart backdrop-blur-md" style={{backgroundColor: "rgba(16, 12, 52, 0.8)"}}>
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 self-center mt-[-6rem] ml-40 gap-5">
            <span className="text-7xl">
              <span>Learning</span>
              <span className="text-homeEmphasizedText"> code </span>
              <span>by doing</span>
              <span className="text-homeEmphasizedText"> code </span>
            </span>
            <span className="text-3xl font-thin">Brought to you by AAI Coding Club</span>
            <div className="flex flex-row gap-5">
              <Button className="w-48 rounded-xl bg-homePlayButton text-primary font-bold text-3 text-md hover:bg-homePlayButton/80">Play now</Button>
              <Button className="w-48 rounded-xl bg-transparent border-primary border-2 text-white font-bold text-md hover:text-black">Learn more</Button>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-homeAboutUsBg p-14 sawtooth">

        <Card className="flex flex-row mb-12">

          <div>
            <CardHeader>
              <CardTitle className="text-3xl">
                About Us
              </CardTitle>
            </CardHeader>

            <CardContent className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac turpis. Adipiscing elit ut aliquam purus sit amet luctus. Mattis pellentesque id nibh tortor id. Arcu ac tortor dignissim convallis aenean. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Id volutpat lacus laoreet non curabitur. Dui ut ornare lectus sit amet est. Id leo in vitae turpis massa. Feugiat vivamus at augue eget arcu dictum varius. Viverra nibh cras pulvinar mattis. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Amet aliquam id diam maecenas ultricies mi eget mauris. Neque vitae tempus quam pellentesque. Gravida quis blandit turpis cursus. Est ullamcorper eget nulla facilisi etiam.
            </CardContent>
          </div>

          <img src="/assets/home/about-us.png" className="w-[30rem] rounded-2xl object-cover m-5"/>

        </Card>
      </div>

      <div className="bg-homeInfoCardsBg sawtooth2 pb-12">

        <div className="p-14">
          <div className="flex justify-center mb-12">
            <span className="text-3xl">What do we do?</span>
          </div>
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

      
    </Navigation>
  )

}