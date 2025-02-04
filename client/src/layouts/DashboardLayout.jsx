import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout = () => {
    const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`} style={{ display: 'flex' }}>
        <Sidebar /> 
        <div style={{ flex: 1, padding: '20px', marginLeft: '16rem' }}>
        <Outlet /> 
        </div>
    </div>
  )
}

export default DashboardLayout