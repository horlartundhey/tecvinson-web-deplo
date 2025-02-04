import { GraduationCap, LayoutGrid } from 'lucide-react';
import React from 'react'
import logoDark from '../assets/teclogo.png';
import logoLight from '../assets/tecvinson-light.png';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    // Navigation items
    const { isDarkMode } = useTheme();
    const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutGrid className="w-5 h-5" />,
      path: "/dashboard",

    },
    {
      title: 'Enrolments',
      icon: <GraduationCap className="w-5 h-5" />,
      path: "/enrollments",
    },
  ];

  return (
    <div className={`h-screen w-64 flex flex-col fixed top-0 left-0 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} transition-all duration-300 z-10`}>
    {/* Logo */}
    <div className="p-6">
      <div className="flex items-center gap-2">
        {/* Replace with your actual logo */}
        <img src={isDarkMode ? logoLight : logoDark} alt="Logo" />
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-4 py-2">
      {navItems.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
            ${location.pathname === item.path
              ? 'bg-blue-500 text-white' 
              : `${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
          `}
        >
          {item.icon}
          <span className="font-medium">{item.title}</span>
        </Link>
      ))}
    </nav>
  </div>
  )
}

export default Sidebar