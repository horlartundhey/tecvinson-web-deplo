import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/teclogo.png';
import { FaBars, FaXmark, FaMoon, FaSun, FaChevronDown } from 'react-icons/fa6';
import { FiGlobe } from 'react-icons/fi';
import { HiOutlineComputerDesktop, HiCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineUsers } from 'react-icons/hi2';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark', !isDarkMode);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navitems = [
        { link: "Home", path: "/" },
        { link: "About Us", path: "/about-us" },
        { link: "Services", path: "/services" },        
        // { link: "Solutions", path: "/solutions" },
        { link: "Contact Us", path: "/contact-us" },
    ];

    const servicesItems = [
        {name: "IT Training", icon: <HiOutlineComputerDesktop />, bgColor: "#D2F8FF", path: "/services" },
        { name: "Solutions & Product Development", icon: <HiCodeBracket />, bgColor: "#FFEAE7", path: "/solutions" },
        { name: "IT Consultancy", icon: <HiOutlineChatBubbleLeftRight />, bgColor: "#F7E3FF", path: "/consultancy" },
        { name: "Staff Augmentation", icon: <HiOutlineUsers />, bgColor: "#DFFFE8", path: "/staff-augment" },
    ];

    const handleMouseEnter = () => {
        // Clear any existing timeout to prevent accidental closing
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
        }
        setIsServicesDropdownOpen(true);
    };
    
    const handleMouseLeave = () => {
        // Set a timeout to delay the closing of the dropdown
        const timeout = setTimeout(() => {
            setIsServicesDropdownOpen(false);
        }, 200); // Adjust the delay (200ms here)
        setDropdownTimeout(timeout);
    };


    const toggleMobileServicesDropdown = () => {
        setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen);
    };

    return (
        <header className="w-full bg-white dark:bg-gray-900 top-0 left-0 right-0">
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
                <div className="flex justify-between items-center text-base gap-0">
                    {/* Logo */}
                    <div>
                        <Link to="/"><img src={logo} alt="Logo" /></Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="md:flex space-x-12 hidden">
                        {navitems.map(({ link, path }) => 
                            link === "Services" ? (
                                <li
                                    key={path}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative"
                                >
                                    <Link to={path} className="text-gray900 dark:text-white hover:text-brandprimary first:font-medium">
                                        {link}
                                    </Link>

                                    {isServicesDropdownOpen && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 space-y-4 z-50"
                                            onMouseEnter={handleMouseEnter} 
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {servicesItems.map((service, index) => (
                                                <Link key={index} to={service.path} className="flex items-center space-x-3 hover:text-brandprimary">
                                                    <span
                                                        className="flex items-center justify-center w-10 h-10 rounded"
                                                        style={{ backgroundColor: service.bgColor }}
                                                    >
                                                        {service.icon}
                                                    </span>
                                                    <span className="text-gray-900 dark:text-white font-bold">{service.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li key={path}>
                                    <Link to={path} className="text-gray900 dark:text-white hover:text-brandprimary first:font-medium">
                                        {link}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-brandprimary focus:outline-none">
                            {isMenuOpen ? <FaXmark className="h-6 w-6 text-brandprimary" /> : <FaBars className="h-6 w-6 text-brandprimary" />}
                        </button>
                    </div>

                    {/* Dark Mode & Language Options (Desktop Only) */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button onClick={toggleDarkMode} className="focus:outline-none">
                            {isDarkMode ? <FaSun className="h-6 w-6 text-yellow-400" /> : <FaMoon className="h-6 w-6 text-gray-500" />}
                        </button>
                        <div className="relative group">
                            <button className="flex items-center focus:outline-none text-gray900 dark:text-white">
                                <FiGlobe className="h-6 w-6 mr-2" />
                                <span>{language}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Sliding Sidebar) */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-6 flex flex-col space-y-4">
                    {/* Close button */}
                    <button onClick={toggleMenu} className="self-end focus:outline-none text-brandprimary">
                        <FaXmark className="h-6 w-6" />
                    </button>
                    
                    {/* Mobile Navigation Links */}
                    <ul className="flex flex-col space-y-4">
    {navitems.map(({ link, path }) => 
        link === "Services" ? (
            <li key={path} className="relative">
                <div
                    className="flex items-center justify-between text-gray-900 dark:text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                    onClick={toggleMobileServicesDropdown}
                >
                    {link}
                    <FaChevronDown
                        className={`transform transition-transform duration-200 ${isMobileServicesDropdownOpen ? "rotate-180" : ""}`}
                    />
                </div>
                
                {isMobileServicesDropdownOpen && (
                    <div className="mt-2 pl-4 space-y-2">
                        {servicesItems.map((service, index) => (
                            <Link
                                key={index}
                                to={service.path}
                                onClick={() => {
                                    toggleMenu(); // Close the menu when the service is clicked
                                }}
                                className="flex items-center space-x-3 hover:text-brandprimary"
                            >
                                <span
                                    className="flex items-center justify-center w-8 h-8 rounded-full"
                                    style={{ backgroundColor: service.bgColor }}
                                >
                                    {service.icon}
                                </span>
                                <span className="text-gray-900 dark:text-white">{service.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </li>
        ) : (
            <li key={path}>
                <Link
                    to={path}
                    onClick={toggleMenu} // Close the menu when the link is clicked
                    className="text-gray-900 dark:text-white block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    {link}
                </Link>
            </li>
        )
    )}
</ul>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
