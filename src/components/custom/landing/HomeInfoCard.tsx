import { Card, CardTitle } from "@/components/ui/card";

interface HomeInfoCardProps {
    title: string;
    icon: string;
    children: React.ReactNode;
}

export default function HomeInfoCard({ title, icon, children }: HomeInfoCardProps) {
    return (
        <Card className="w-56 aspect-square grow text-center flex items-center justify-center relative transition-all duration-300 hover:scale-105 hover:bg-primary hover:bg-opacity-75 group">
            {/* Icon and Title */}
            <div className="flex flex-col items-center justify-center gap-2 z-0 transition-opacity duration-300 group-hover:opacity-15">
                <img src={icon} className="w-32 rounded-full self-center" />
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>

            {/* Children (Overlay) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 p-4 flex items-center justify-center transition-opacity duration-300 z-20">
                {children}
            </div>
        </Card>
    );
}
