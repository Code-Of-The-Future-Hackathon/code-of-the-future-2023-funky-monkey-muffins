import React from "react";

import Nav from "../components/Nav"
import ProfileBubble from "../components/ProfileBubble";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <Nav />

            <div className="flex flex-col items-center">
                <ProfileBubble name={"Boris"} profession={"the thinker"} description={"staa"} rating={5} />
            </div>

        </div>

    );
}

export default Home;