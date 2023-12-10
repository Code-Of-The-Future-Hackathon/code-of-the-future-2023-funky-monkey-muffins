import React from "react";

type Props = {
    name: string;
    profession: string;
    description: string;
    rating: number;
}

const ProfileBubble: React.FC<Props> = ({ name, profession, description, rating }) => {
    return (
        <div className="flex items-center justify-center w-[85%] bg-gray-900 shadow-lg rounded-[5rem] p-4">
            <div className="flex-1">
                <img src="" alt={name} className="w-16 h-16 rounded-full mr-4" />
                <div className="text-xl font-bold mb-2">{name}</div>
                <div className="text-gray-600 mb-2">{profession}</div>
                <p className="text-gray-500">{description}</p>
            </div>
            <div className="flex items-center">
                <img src="" alt="Rating" className="w-6 h-6 mr-2" />
                <span>{rating}</span>
            </div>
        </div>
    );
}

export default ProfileBubble;