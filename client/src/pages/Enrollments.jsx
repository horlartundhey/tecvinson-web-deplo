import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Search, Calendar, Filter, Share, Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

import { MdOutlinePsychology } from 'react-icons/md'
import { FiPenTool } from 'react-icons/fi'
import { HiCodeBracket, HiOutlineBriefcase } from 'react-icons/hi2'
import * as XLSX from 'xlsx';

import axios from 'axios';
import EnrollmentModal from './EnrollmentModal';
import ExportPopup from './ExportPopup.jsX';


const Enrollments = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('Product Management');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subcategories');
  const [selectedCohort, setSelectedCohort] = useState('All Cohorts');
  const [subcategories, setSubcategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    date: false,
    category: false,
    cohort: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useTheme();

  const [isExportPopupOpen, setIsExportPopupOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

    const tabs = [
      {
          id: 'product-management',
          label: 'Product Management',
          isActive: true,
          icon: MdOutlinePsychology, // The component itself
          iconStyle: { width: '20px', height: '20px', transform: 'scaleX(-1)' }, // Styles for this icon
      },
      {
          id: 'product-design',
          label: 'Product Design',
          isActive: false,
          icon: FiPenTool, // The component itself
          iconStyle: { width: '20px', height: '20px' }, // Styles for this icon
      },
      {
          id: 'product-development',
          label: 'Product Development',
          isActive: false,
          icon: HiCodeBracket, // The component itself
          iconStyle: { width: '20px', height: '20px' }, // Styles for this icon
      },
      {
          id: 'job-readiness',
          label: 'Job Readiness',
          isActive: false,
          icon: HiOutlineBriefcase, // The component itself
          iconStyle: { width: '20px', height: '20px' }, // Styles for this icon
      },
  ];

  // Check authentication on mount and changes
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch applications
  const fetchApplications = async (page = 1) => {
    try {
      setLoading(true);
      const queryParams = {
        page,
        limit: 10,
        category: activeTab !== 'All' ? activeTab : undefined,
        search: searchQuery?.trim() || undefined,
        cohort: selectedCohort !== 'All Cohorts' ? selectedCohort : undefined,
        dateFrom: selectedDate || undefined,
        subcategory: selectedCategory !== 'All Subcategories' ? selectedCategory : undefined, // Add subcategory filter
      };
      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined)
      );
      // const response = await axios.get('http://localhost:5000/api/applications', {
      const response = await axios.get('https://tecvinson-web-server.vercel.app/api/applications', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        params: cleanParams,
      });
      console.log('Applications Data:', response.data.applications);
  
      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
  
      // Extract unique categories and course titles (subcategories)
      const uniqueCategories = [...new Set(response.data.applications
        .map((app) => app.category?.trim().toLowerCase())
        .filter(Boolean))];
        const uniqueCohorts = [...new Set(
          response.data.applications
            .map((app) => {
              // Handle different cohort structures
              if (app.cohort && typeof app.cohort === 'object' && app.cohort.name) {
                return app.cohort.name;
              } else if (typeof app.cohort === 'string') {
                return app.cohort;
              }
              return null;
            })
            .filter(Boolean)
        )];
        
      console.log('Extracted cohorts:', uniqueCohorts); // For debugging
      const uniqueCourseTitles = Array.isArray(response.data.courseTitles) ? response.data.courseTitles : [];// Use course titles from the backend
  
      setCategories(uniqueCategories);
      setCohorts(uniqueCohorts);
      setSubcategories(uniqueCourseTitles); // Set subcategories to unique course titles
    } catch (error) {
      console.error('Error fetching applications:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  // Handlers
  const handleSearch = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const selectedSubcategory = e.target.value;
    setSelectedCategory(selectedSubcategory);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const handleCohortChange = (e) => {
    setSelectedCohort(e.target.value);
    setCurrentPage(1);
  };

  const handleTabClick = (tabLabel) => {
    setActiveTab(tabLabel);
    setCurrentPage(1);
    setSelectedCategory('All Subcategories');
    setSelectedCohort('All Cohorts');
  };

  const handleExport = (option) => {
    let dataToExport = [];
  
    switch (option) {
      case 'selectedRows':
        // Export selected rows logic
        dataToExport = applications.filter((app) => app.selected); // Assuming you have a `selected` field
        break;
      case 'dateRange':
        // Export data within the selected date range logic
        dataToExport = applications.filter((app) => {
          const dateApplied = new Date(app.dateApplied);
          const fromDate = new Date(selectedDate);
          const toDate = new Date(selectedDate);
          return dateApplied >= fromDate && dateApplied <= toDate;
        });
        break;
      case 'allData':
        // Export all data logic
        dataToExport = applications;
        break;
      default:
        console.log('Invalid export option');
        return;
    }
  
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
  
    // Export to file
    XLSX.writeFile(wb, 'applications.xlsx');
  };

  const toggleDropdown = (type) => {
    setDropdownStates((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Fetch data when filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications(1);
    }
  }, [activeTab, selectedCohort, selectedDate, searchQuery, selectedCategory, isAuthenticated]);

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
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
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search applicant name, email, phone"
            className="pl-10 pr-4 py-2 border dark:border-gray-600 rounded-xl w-[640px] dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-red-500">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 dark:text-gray-200">
        <h1 className="text-2xl font-bold mb-4">Enrollments</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.label)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              activeTab === tab.label
                ? 'bg-blue-500 text-white'
                : 'bg-[#F1F1F1] dark:bg-gray-800 text-[#5E5E5E] dark:text-[#ACACAC] hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon style={tab.iconStyle} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mx-6 border dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold dark:text-gray-200">{activeTab}</h2>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Search className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search applicant name, email, phone"
              className="w-96 pl-10 pr-10 py-2 border text-[#ACACAC] bg-[#fafafa] dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Dark mode styling for select inputs */}
          <div className="relative ">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Calendar className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="appearance-none pl-10 pr-32 py-2 border text-[#ACACAC] bg-[#fafafa] dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ChevronDown className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Filter className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="appearance-none pl-10 pr-32 py-2 border text-[#ACACAC] bg-[#fafafa] dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Subcategories">All Subcategories</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ChevronDown className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Filter className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
            <select
              value={selectedCohort}
              onChange={handleCohortChange}
              className="appearance-none pl-10 pr-32 py-2 border text-[#ACACAC] bg-[#fafafa] dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Cohorts">All Cohorts</option>
              {cohorts.map((cohort) => (
                <option key={cohort.id || cohort} value={cohort.name || cohort}>
                  {cohort.name || cohort}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ChevronDown className="text-gray-400 dark:text-gray-500 w-5 h-5" />
            </div>
          </div>
          
          <button
            onClick={() => setIsExportPopupOpen(true)}
            className="px-4 py-2 underline dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Share className="w-5 h-5" />
            Export
          </button>

        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="w-8 p-4">
                  <input type="checkbox" className="rounded dark:bg-gray-700 dark:border-gray-600" />
                </th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">S/N</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Applicant Name</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Course</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date Applied</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Phone</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Cohorts</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</th>
                <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 dark:text-gray-300">
                    Loading...
                  </td>
                </tr>
              ) : applications && applications.length > 0 ? (
                applications.map((application, index) => (
                  <tr key={application.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-4">
                      <input type="checkbox" className="rounded dark:bg-gray-700 dark:border-gray-600" />
                    </td>
                    <td className="p-4 text-sm dark:text-gray-300">{(currentPage - 1) * 10 + index + 1}</td>
                    <td className="p-4 text-sm dark:text-gray-300">{application.name}</td>
                    <td className="p-4 text-sm dark:text-gray-300">{application.course}</td>
                    <td className="p-4 text-sm dark:text-gray-300">
                      {new Date(application.dateApplied).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-4 text-sm dark:text-gray-300">{application.email}</td>
                    <td className="p-4 text-sm dark:text-gray-300">{application.phone}</td>
                    <td className="p-4 text-sm dark:text-gray-300">{application.cohort?.name}</td> {/* Render cohort name */}
                    <td className="p-4">
                      <span className={getStatusBadge(application.status)}>
                        {application.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="text-blue-500 dark:text-blue-400 text-sm hover:underline"
                        onClick={() => {
                          setSelectedApplication(application);
                          setIsModalOpen(true);
                        }}
                      >
                        View more
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 dark:text-gray-300">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
      />

      {/* Export Popup */}
      {isExportPopupOpen && (
        <ExportPopup
          onClose={() => setIsExportPopupOpen(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

export default Enrollments;