import React from "react";

interface infoProps {
    title: string,
    tags?: Array<string>,
    description: string
}

const InfoBubble: React.FC<infoProps> = ({ title, tags, description }) => {
    return (
        <div className="m-5 bg-gradient-to-br from-violet-900 to-pink-300 rounded-xl text-white">
            <div className="text-xl p-2 pl-4">
                {title}
            </div>
            {tags}
            <br />

            <div className="grid grid-cols-2">
                
                <button className="btn bg-pink-300 rounded-xl pl-6 pr-6 mb-3 mr-3 col-end-4">Next</button>
            </div>

        </div>);
}

export default InfoBubble;