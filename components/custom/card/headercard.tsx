import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface HeaderCardProps {
  header?: any;
  className?:any;
  children?: React.ReactNode;
  footer?: any;
}

function HeaderCard({ header, className, children, footer }: HeaderCardProps) {
  return (
    <Card className={`relative flex flex-col grow items-start w-1/2 p-0 ${className}`}>
      <div className="p-0 mt-0 rounded-tl-2xl rounded-tr-2xl h-12 flex justify-center items-center bg-black w-full bg-slate-900">
        {header}
      </div>
      <div className="relative w-full border-t-2 border-slate-900">
        {children}
      </div>
      {footer}
    </Card>
  );
}

export default HeaderCard;
