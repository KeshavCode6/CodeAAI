"use client"

import OfficerAbout from "@/components/custom/officer-about"
import Navigation from "@/components/custom/navigation"
import Footer from "@/components/custom/footer"

const officerAbouts = [
    {
        "name": "Shaurya Kumar", 
        "role": "VP of Development", 
        "icon": "/assets/contact/officer-icon/shaurya-kumar.png", 
        "description": "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com."
    }, 
    {
        "name": "Keshav Shah", 
        "role": "VP of Development", 
        "icon": "/assets/contact/officer-icon/keshav-shah.png", 
        "description": "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com."
    }, 
]

// UNFINISHED
export default function Contact() {

    return (
        <Navigation path={"/contact"}>
            <div className="bg-aboutUsOfficersBg">
                {officerAbouts.map((officer, index) => (
                    <OfficerAbout name={officer.name} role={officer.role} icon={officer.icon} right={(index+1)%2==0}>
                        {officer.description}
                    </OfficerAbout>
                ))}
            </div>
            <Footer/>
        </Navigation>
    )

}