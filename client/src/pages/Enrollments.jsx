import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Search, Calendar, Filter, Share, Sun,
    Moon,
    User,
    ChevronDown, } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';


const Enrollments = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Product Management');
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subcategories');
  const [selectedCohort, setSelectedCohort] = useState('All Cohorts');
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownStates, setDropdownStates] = useState({
    date: false,
    category: false,
    cohort: false
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  const { isDarkMode, setIsDarkMode } = useTheme();


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const tabs = [
    { id: 'product-management', label: 'Product Management', isActive: true },
    { id: 'product-design', label: 'Product Design', isActive: false },
    { id: 'product-development', label: 'Product Development', isActive: false },
    { id: 'job-readiness', label: 'Job Readiness', isActive: false },
];


  // Check authentication on mount and changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

  // Protected API call function
  const fetchApplications = async (page = 1) => {
  try {
    setLoading(true);
    const response = await axios.get('/api/applications', {
      params: {
        category: activeTab,
        search: searchQuery,
        cohort: selectedCohort !== 'All Cohorts' ? selectedCohort : undefined,
        dateFrom: selectedDate,
        page,
        limit: 10
      }
    });

    setApplications(response.data.applications);
    setTotalPages(response.data.totalPages);
    setCurrentPage(response.data.currentPage);
  } catch (error) {
    console.error('Error fetching applications:', error);
    if (error.response?.status === 401) {
      navigate('/login');
    }
  } finally {
    setLoading(false);
  }
};

  // Fetch data when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications(1);
    }
  }, [activeTab, selectedCohort, selectedDate, searchQuery, isAuthenticated]);

  const toggleDropdown = (type) => {
    setDropdownStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
        

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'successful':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Redirecting to login...</div>
      </div>
    );
  }
  return (
   <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">        
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search applicant name, email, phone"
            className="pl-10 pr-4 py-2 border dark:border-gray-600 rounded-xl w-[640px] 
                   dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4 " />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg dark:bg-gray-700">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => navigate('/settings')}
                  >
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-red-500"
                    onClick={() => navigate('/logout')}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

        <div className='p-6 dark:text-gray-200'>
            <h1 className="text-2xl font-bold mb-4">Enrollments</h1>
        </div>  

      {/* Tabs */}
      {tabs.map((tab) => (
        <button
            key={tab.id}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            activeTab === tab.label
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
        >
            {tab.label}
        </button>
        ))}

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border">            
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{activeTab}</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
            {/* Search input */}
            <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search applicant name, email, phone"
                className="w-96 pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Date Select */}
            {/* <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Calendar className="text-gray-400 w-5 h-5" />
            </div>
            <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="appearance-none pl-10 pr-32 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            > */}
                {/* <option value="">DD-MM-YYYY</option> */}
                {/* Add date options */}
            {/* </select> */}
            {/* <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
                isDateDropdownOpen ? "rotate-180" : ""
                }`}
            >
                <ChevronDown className='text-gray-400 w-4 h-4'/>
            </div>
            </div> */}

            {/* Category Select */}
            {/* <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
            </div>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none pl-10 pr-32 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option>All Subcategories</option> */}
                {/* Add category options */}
            {/* </select>
            <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
                isCategoryDropdownOpen ? "rotate-180" : ""
                }`}
            >
                <ChevronDown  className='text-gray-400 w-4 h-4'/>
            </div>
            </div> */}

            {/* Cohort Select */}
            {/* <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
            </div>
            <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="appearance-none pl-10 pr-32 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option>All Cohorts</option> */}
                {/* Add cohort options */}
            {/* </select>
            <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
                isCohortDropdownOpen ? "rotate-180" : ""
                }`}
            >
                <ChevronDown  className='text-gray-400 w-4 h-4'/>
            </div>
            </div> */}

            {/* Export Button */}
            <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Share className="w-5 h-5" />
            Export
            </button>
        </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="w-8 p-4">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">S/N</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Applicant Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Course</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Date Applied</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Phone</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Payment Status</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr>
                    <td colSpan="9" className="text-center py-4">Loading...</td>
                    </tr>
                ) : applications && applications.length > 0 ? (
                    applications.map((application, index) => (
                    <tr key={application.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                        <input type="checkbox" className="rounded" />
                        </td>
                        <td className="p-4 text-sm">{(currentPage - 1) * 10 + index + 1}</td>
                        <td className="p-4 text-sm">{application.name}</td>
                        <td className="p-4 text-sm">{application.course}</td>
                        <td className="p-4 text-sm">
                        {new Date(application.dateApplied).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                        </td>
                        <td className="p-4 text-sm">{application.email}</td>
                        <td className="p-4 text-sm">{application.phone}</td>
                        <td className="p-4">
                        <span className={getStatusBadge(application.status)}>
                            {application.status}
                        </span>
                        </td>
                        <td className="p-4">
                        <button className="text-blue-500 text-sm hover:underline">
                            View more
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="9" className="text-center py-4">No applications found</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between p-4">
                <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 text-sm ${
                    currentPage === 1 ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    ← Previous
                </button>
                <div className="flex items-center gap-2 text-sm">
                    <span>Page</span>
                    <input 
                    type="number" 
                    className="w-16 px-2 py-1 border rounded-lg text-center" 
                    value={currentPage}
                    onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page > 0 && page <= totalPages) {
                        fetchApplications(page);
                        }
                    }}
                    />
                    <span>of {totalPages}</span>
                </div>
                <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 text-sm ${
                    currentPage === totalPages ? 'text-gray-400' : 'text-gray-600'
                    }`}
                >
                    Next →
                </button>
                </div> */}
          </div>
        </div>
      </div>    
  )
}

export default Enrollments