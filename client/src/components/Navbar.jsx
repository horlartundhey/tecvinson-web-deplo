import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/teclogo.png';
import { FaBars, FaXmark, FaChevronDown } from 'react-icons/fa6';
import { FiGlobe } from 'react-icons/fi';
import { HiOutlineComputerDesktop, HiCodeBracket, HiOutlineChatBubbleLeftRight, HiOutlineUsers } from 'react-icons/hi2';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
        { id: 'home', link: "Home", path: "/" },
        { id: 'about', link: "About Us", path: "/about-us" },
        { id: 'services', link: "Services" },
        { id: 'contact', link: "Contact Us", path: "/contact-us" },
    ];

    const servicesItems = [
        { id: 'training', name: "IT Training", icon: <HiOutlineComputerDesktop />, bgColor: "#D2F8FF", path: "/trainings" },
        { id: 'solutions', name: "Solutions & Product", icon: <HiCodeBracket />, bgColor: "#FFEAE7", path: "/solutions" },
        { id: 'consultancy', name: "IT Consultancy", icon: <HiOutlineChatBubbleLeftRight />, bgColor: "#F7E3FF", path: "/consultancy" },
        { id: 'staff', name: "Staff Augmentation", icon: <HiOutlineUsers />, bgColor: "#DFFFE8", path: "/staff-augment" },
    ];

    const handleMouseEnter = () => {
        if (dropdownTimeout) {
            clearTimeout(dropdownTimeout);
        }
        setIsServicesDropdownOpen(true);
    };
    
    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setIsServicesDropdownOpen(false);
        }, 200);
        setDropdownTimeout(timeout);
    };

    const toggleMobileServicesDropdown = () => {
        setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen);
    };

    return (
        <header className="w-full bg-white top-0 left-0 right-0 lg:px-[150px] px-[20px]" style={{ position: 'relative', zIndex: 50 }}>
            <nav className={`py-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
                <div className="flex justify-between items-center text-base gap-0">
                    <div>
                        <Link to="/"><img src={logo} alt="Logo" /></Link>
                    </div>

                    <ul className="md:flex space-x-12 hidden">
                        {navitems.map(({ id, link, path }) => 
                            link === "Services" ? (
                                <li
                                    key={id}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="relative"
                                >
                                    <Link to={path} className="text-gray900 hover:text-brandprimary first:font-medium">
                                        {link}
                                    </Link>

                                    {isServicesDropdownOpen && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg rounded-md p-4 space-y-4 z-50"
                                            style={{ zIndex: 60 }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {servicesItems.map((service) => (
                                                <Link key={service.id} to={service.path} className="flex items-center space-x-3 hover:text-brandprimary">
                                                    <span
                                                        className="flex items-center justify-center w-10 h-10 rounded"
                                                        style={{ backgroundColor: service.bgColor }}
                                                    >
                                                        {service.icon}
                                                    </span>
                                                    <span className="text-gray-900 font-bold">{service.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li key={id}>
                                    <Link to={path} className="text-gray900 hover:text-brandprimary first:font-medium">
                                        {link}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-brandprimary focus:outline-none">
                            {isMenuOpen ? <FaXmark className="h-6 w-6 text-brandprimary" /> : <FaBars className="h-6 w-6 text-brandprimary" />}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <div className="relative group">
                            <button className="flex items-center focus:outline-none text-gray900">
                                <FiGlobe className="h-6 w-6 mr-2" />
                                <span>{language}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-6 flex flex-col space-y-4">
                    <button onClick={toggleMenu} className="self-end focus:outline-none text-brandprimary">
                        <FaXmark className="h-6 w-6" />
                    </button>
                    
                    <ul className="flex flex-col space-y-4">
                        {navitems.map(({ id, link, path }) => 
                            link === "Services" ? (
                                <li key={id} className="relative">
                                    <div
                                        className="flex items-center justify-between text-gray-900 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                                        onClick={toggleMobileServicesDropdown}
                                    >
                                        {link}
                                        <FaChevronDown
                                            className={`transform transition-transform duration-200 ${isMobileServicesDropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                    
                                    {isMobileServicesDropdownOpen && (
                                        <div className="mt-2 pl-4 space-y-2">
                                            {servicesItems.map((service) => (
                                                <Link
                                                    key={service.id}
                                                    to={service.path}
                                                    onClick={toggleMenu}
                                                    className="flex items-center space-x-3 hover:text-brandprimary"
                                                >
                                                    <span
                                                        className="flex items-center justify-center w-8 h-8 rounded"
                                                        style={{ backgroundColor: service.bgColor }}
                                                    >
                                                        {service.icon}
                                                    </span>
                                                    <span className="text-gray-900">{service.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li key={id}>
                                    <Link
                                        to={path}
                                        onClick={toggleMenu}
                                        className="text-gray-900 block px-4 py-2 hover:bg-gray-100 rounded"
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