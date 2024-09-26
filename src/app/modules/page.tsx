"use client"

import { Navbar } from "@/components/utils/Navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CircleIcon } from "lucide-react"
import Link from "next/link"

export default function Modules() {

    return (

        <Navbar path="/modules">

            <div className="flex flex-col mt-20 gap-y-10">

                <CourseProgressBar progressPercent={66}/>

                <ModuleSection title="Introduction to Programming" iconUrl="/python.png" modules={[
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    {
                        "title": "Introduction to computer programming", 
                        "id": "intro-to-computer-programming", 
                        "completed": false
                    }, 
                    
                ]}/>

            </div>

        </Navbar>

    )

}

function CourseProgressBar({progressPercent} : {progressPercent : number}) {

    return (
        <div className="w-[50rem] self-center flex justify-end">
            <div className="flex flex-col gap-y-2">
                <span className="text-lg">{progressPercent}% of course completed</span>
                <Progress value={progressPercent} className="w-64"/>
            </div>
        </div>
    )

}

function ModuleSection({title, iconUrl, modules} : {title : string, iconUrl : string, modules : Array<any>}) {

    return (
        <Card className="w-[50rem] self-center flex flex-col">

            <CardHeader>

                <ModuleSectionHeader title={title} iconUrl={iconUrl} modulesLength={modules.length}/>

            </CardHeader>

            <div className="flex flex-col pb-5 px-10">

                <Separator/>

                {modules.map(module => (
                    <ModuleLink title={module.title} id={module.id} completed={module.completed}/>
                ))}
                
 
            </div>
        </Card>
    )

}

function ModuleSectionHeader({title, iconUrl, modulesLength} : {title : string, iconUrl : string, modulesLength : number}) {

    return (
        <div className="flex flex-row gap-x-5">

            <img src={iconUrl} alt={title} className="w-20"/>

            <div className="my-auto">
                <CardTitle className="text-3xl mb-2">{title}</CardTitle>
                <span className="text-gray-500 text-xl">{modulesLength} module{modulesLength==1?"":"s"}</span>
            </div>

        </div>
    )

}

function ModuleLink({title, id, completed} : {title : string, id : string, completed : boolean}) {

    return (
        <div>

            <div className="py-4 flex flex-row gap-x-3">

                <CircleIcon size={30}/>

                <Link className="text-gray-300 text-xl my-auto" href={`/modules/${id}`}>
                    {title}
                </Link>

            </div>

            <Separator/>

        </div>  
    )

}