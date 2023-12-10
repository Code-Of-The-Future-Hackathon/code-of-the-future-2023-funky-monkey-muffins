import React from "react";
import Nav from "../components/Nav";
import InfoBubble from "../components/InfoBubble";

import profileLogo from "../resources/profileLogo.png"

type Props = {
    name: string
};

const Profile: React.FC<Props> = ({ name }) => {
    return (
        <div>
            <Nav />
            <div className="grid grid-cols-4 h-full">
                <div className="bg-darkBlue col-span-1 h-full">
                    <div className="flex items-center justify-center w-[250%]  mt-10 ml-20 bg-[#31304D] from-violet-900 to-pink-300 from-60% shadow-lg rounded-[5rem] p-4 text-white">
                        <div className="flex-1">
                            <div className="text-xl font-bold mb-2">{name}</div>
                            <div className="text-white mb-2">Example text example text example text example text example text</div>
                        </div>
                        <div className="flex items-center justify-end">
                            <img src={profileLogo} alt="profileLogo" className="w-20 h-full mr-2" />
                        </div>
                    </div>

                    <div className="mt-10 ml-10 text-white">
                        <h2 className="text-xl font-bold mb-2">Contacts:</h2>
                        <p>Phone: [phone number]</p>
                        <p>Email: [email]</p>
                        <p>Address: [address]</p>

                        <h2 className="text-xl font-bold mb-2 mt-4">Education:</h2>
                        <p>Qualification: [qualification]</p>

                        <h2 className="text-xl font-bold mb-2 mt-4">About me:</h2>
                        <p>[little info about the person]</p>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col overflow-hidden mt-48 ">
                    <div>
                        <InfoBubble title="title" tags={["new", "crazy"]} description="description" />
                        <InfoBubble title="title" tags={["new", "crazy"]} description="description" />
                        <InfoBubble title="title" tags={["new", "crazy"]} description="description" />
                        <InfoBubble title="title" tags={["new", "crazy"]} description="description" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile