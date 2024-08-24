"use client"
import { Sidebar } from "@/components/Navigation";
import { ThreeDots } from "@/components/Threedots";


export default function Dashboard() {
  return (
    <Sidebar path="/dashboard">
        <ThreeDots/>
      </Sidebar>
  )
}
