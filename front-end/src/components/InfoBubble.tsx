import React from "react";

interface infoProps {
    title: string,
    tags: string[],
    description: string
}

const InfoBubble: React.FC<infoProps> = ({ title, tags, description }) => {
    return (
        <div className="m-5 bg-[#31304D] from-violet-900 to-pink-300 rounded-xl text-white">
            <div className="flex items-center">
                <div className="text-3xl p-2 pl-4">{title}</div>
                <div className="flex flex-wrap p-2 pl-4">
                    {tags.map((tag, index) => (
                        <span key={index} className="m-1 p-1 bg-white text-black rounded">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="text-xl p-2 pl-4">{description}</div>
            <div className="grid grid-cols-2">
                <button className="btn bg-pink-500 border border-gray-300 rounded-xl p-4 mb-3 mr-5 col-end-4">Next</button>
            </div>
        </div>
    );
}

export default InfoBubble;