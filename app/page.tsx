"use client"
import Navigation from "@/components/ui/navigation"

export default function Home() {

  const imgUrl = "https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8="

  return (
    <Navigation>
      <div className="h-[90vh] bg-cover flex justify-center" style={{backgroundImage: `url("${imgUrl}")`}}>
        <div className="w-[100%] h-[100%] bg-black opacity-50">
          <div className="flex flex-col text-center mt-[30vh]">
            <span className="text-[90px]">Coding Club AAI</span>
            <span className="text-[25px]">Coding Challenges, live competitions, hackathons, and more</span>
          </div>
        </div>
      </div>
    </Navigation>
  )

}