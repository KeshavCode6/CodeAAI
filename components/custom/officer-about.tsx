"use client";

import { Card, CardFooter } from "../ui/card";

export default function OfficerAbout(props: any) {
  const { name, role, index, icon, children } = props;

  return (
    <Card className="hover:bg-slate-900 opacity-0 transition-all animate-fade shadow-slate-900 shadow-xl" style={{animationFillMode:"forwards", animationDelay:`${0.15*index}s`}}>
      <div className="flex flex-col items-center  p-5">
        <img
          src={icon}
          className="w-48 h-48 rounded-full aspect-square object-cover"
        />

        <div className="flex flex-col ml-5">
          <span className="text-xl text-center">{name}</span>
          <span className="text-lg text-amber-500 text-center mt-[-5px] mb-2">{role}</span>
          <span className="text-xs mt-[-6px]">{children}</span>
        </div>
      </div>

      <CardFooter>
        <a></a>  
      </CardFooter>
    </Card>
  );
}
