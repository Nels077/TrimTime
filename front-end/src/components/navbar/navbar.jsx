import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"
const Navbar = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="nav__item">
                    <Link to={"/aboutUs"}>About Us</Link>
                </li>
                {/* <li className="nav__item">
                    <Link to={"/services"}>Services</Link>
                </li> */}
                <li className="nav__item">
                    <Link to={"/contact"}>Contact Us</Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;