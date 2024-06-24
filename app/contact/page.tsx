import OfficerAbout from "@/components/custom/OfficerAbout";
import Navigation from "@/components/custom/navigation";
import Footer from "@/components/custom/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const officerAbouts = [
  {
    name: "Keshav Shah",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/keshav-shah.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  {
    name: "Shaurya Kumar",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/shaurya-kumar.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  {
    name: "Sohan Kyatham",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/keshav-shah.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  {
    name: "Nandukishor Dakka",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/keshav-shah.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  {
    name: "Keshav Shah",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/keshav-shah.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  {
    name: "Keshav Shah",
    role: "VP of Development",
    icon: "/assets/contact/officer-icon/keshav-shah.png",
    description:
      "I am a sophomore who loves to code! I started my journey with simple Scratch games, but eventually moved on to Python and JavaScript. I am one of the developers of this website! You can email me at kshaurya731@gmail.com.",
  },
  // Add more officers as needed
];

export default function Contact() {
  return (
    <Navigation path={"/contact"}>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-2xl mt-10 mb-4">Officer Team</h1>
        <div className="grid grid-cols-3 gap-4 w-full max-w-screen-xl">
          {officerAbouts.map((officer, index) => (
            <OfficerAbout
              key={index}
              index={index}
              name={officer.name}
              role={officer.role}
              icon={officer.icon}
            >
              {officer.description}
            </OfficerAbout>
          ))}
        </div>
      </div>
      <Footer />
    </Navigation>
  );
}
