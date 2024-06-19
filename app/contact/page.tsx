"use client"

import OfficerAbout from "@/components/custom/officer-about"
import Navigation from "@/components/custom/navigation"

export default function Contact() {

    return (
        <Navigation path={"/contact"}>

            <div className="h-screen">
                {/* idk if we need smt to go here */}
            </div>

            <div className="bg-aboutUsOfficersBg">

                <OfficerAbout name="Shaurya Kumar" role="VP of Development" icon="/assets/about-us/officer-icon/shaurya-kumar.png">
                    I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at <a href="mailto:kshaurya731@gmail.com">kshaurya731@gmail.com</a>
                </OfficerAbout>

                <OfficerAbout name="Keshav Shah" role="VP of Development" icon="/assets/about-us/officer-icon/keshav-shah.png" right>
                    I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at <a href="mailto:kshaurya731@gmail.com">kshaurya731@gmail.com</a>
                </OfficerAbout>

            </div>
        </Navigation>
    )

}