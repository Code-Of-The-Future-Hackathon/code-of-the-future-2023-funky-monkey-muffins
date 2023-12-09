import React from "react";
import Nav from "../components/Nav";
import InfoBubble from "../components/InfoBubble";

type Props = {
    name: string
};

const Profile: React.FC<Props> = ({ name }) => {
    return (
        <div>
            <Nav />
            {/* <div className="bg-darkBlue w-1/4 h-screen fixed">
                <div className="flex-1 items-center justify-center w-[250%] mt-10 ml-20 bg-gradient-to-br from-violet-900 to-pink-300 from-60% shadow-lg rounded-[5rem] p-4 text-white">
                    <div className="flex-1">
                        <div className="text-xl font-bold mb-2">{name}</div>
                        <div className="text-white mb-2">Example text example text example text example text example text</div>
                    </div>
                    <div className="flex items-center">
                        <img src="" alt="Rating" className="w-6 h-6 mr-2" />
                    </div>
                </div>

                
            </div> */}

            <div className="w-3/5">
                <div>
                    <InfoBubble title="title" description="description" />
                </div>
            </div>
        </div>
    );
}

export default Profile