"use client"

export default function OfficerAbout(props: any) {

    const {name, role, icon, right, children} = props;

    return (
        <div>
            {(!right) ? (
                <div className="flex flex-row p-5 w-1/2">
                    <img src={icon} className="w-48 h-48 rounded-full border-4 border-white border-double"/>

                    <div className="flex flex-col ml-5 gap-2">
                        <span className="text-4xl">{name}</span>
                        <span className="text-2xl">{role}</span>
                        <span className="text-xl">{children}</span>
                    </div>
                </div>
            ) : (
                <div className="flex justify-end">
                    <div className="flex flex-row p-5 text-right w-1/2">

                        <div className="flex flex-col mr-5 gap-2">
                            <span className="text-4xl">{name}</span>
                            <span className="text-2xl">{role}</span>
                            <span className="text-xl">{children}</span>
                        </div>

                        <img src={icon} className="w-48 h-48 rounded-full border-4 border-white border-double"/>

                    </div>
                </div>
                
            )}
        </div>
        
    )

}