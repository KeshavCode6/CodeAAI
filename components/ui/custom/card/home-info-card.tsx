import { Card, CardContent, CardHeader, CardTitle } from "../../card";

export default function HomeInfoCard(props: any) {

    const {title, children} = props;

    return (
        <Card className="w-[500px] m-[10px] grow">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )

}