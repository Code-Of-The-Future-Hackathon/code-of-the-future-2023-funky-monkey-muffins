import React from "react";

import logo from "../resources/logo.png"
import homeLogo from  "../resources/homeLogo.png"
import chatLogo from "../resources/chatLogo.png"
import profileLogo from "../resources/profileLogo.png"
import clockLogo from "../resources/clockLogo.png"
import { Link } from "wouter";

const Nav: React.FC = () =>
{
    return (
        <nav className="flex justify-between items-center p-6 bg-darkBlue">
            <Link href="/psychologists"><a><img src={logo} alt="logo" className="h-12"/></a></Link>
            <ul className="flex space-x-4">
                <li><img src={homeLogo} alt="homeLogo" className="h-6 w-6" /></li>
                <li><img src={chatLogo} alt="chatLogo" className="h-6 w-6" /></li>
                <li><Link href="/profile"><a><img src={profileLogo} alt="profileLogo" className="h-6 w-6" /></a></Link></li>
                <li><img src={clockLogo} alt="clockLogo" className="h-6 w-6" /></li>
            </ul>
        </nav>
    )
}

export default Nav;