import { Card, CardContent, CardHeader, CardTitle } from "../../card";

export default function HomeInfoCard(props: any) {

    const {title, icon, children} = props;

    return (
        <Card className="w-1 m-2 grow text-center flex flex-col">
            <img src={icon} className="w-40 rounded-full self-center m-6"/>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )

}