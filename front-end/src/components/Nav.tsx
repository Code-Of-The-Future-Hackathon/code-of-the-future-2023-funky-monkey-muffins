import React from "react";
import logo from "../resources/logo.png"

const Nav: React.FC = () =>
{
    return (
        <nav className="flex justify-between items-center p-6 bg-darkBlue">
            <img src={logo} alt="logo" className="h-12"/>
            <ul className="flex space-x-4">
                <li><img src="" alt="" className="h-6 w-6" /></li>
                <li><img src="" alt="" className="h-6 w-6" /></li>
                <li><img src="" alt="" className="h-6 w-6" /></li>
            </ul>
        </nav>
    )
}

export default Nav;