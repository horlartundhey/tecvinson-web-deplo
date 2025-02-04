import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import recentActorsIcon from '../assets/svg-icons/recent_actors.svg';
import creditScoreIcon from '../assets/svg-icons/credit_score.svg';
import creditCardIcon from '../assets/svg-icons/credit_card_clock.svg';
import percentIcon from '../assets/svg-icons/percent.svg';


import { 
  Search, 
  MonitorPlay, 
  CreditCard, 
  Clock, 
  DollarSign, 
  Percent,
  BookOpen,
  Calendar,
  Sun,
  Moon,
  User,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { HiArrowsUpDown, HiBanknotes, HiClock, HiFire, HiMiniCalendarDays, HiStar } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import { MdCreditScore, MdRecentActors } from 'react-icons/md';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isDarkMode, setIsDarkMode } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  // };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Metric Cards Data
  const metricCards = [
    {
      title: "Total Enrolments",
      value: "1,432",
      icon: <MdRecentActors  className="w-6 h-6 text-[#1b8598] dark:text-[white]" />,
      bgColor: "bg-blue-100 dark:bg-[#1b8598]"
    },
    {
      title: "Paid Enrolments",
      value: "917",
      icon: <MdCreditScore  className="w-6 h-6 text-[#00bf2b] dark:text-white" />,
      bgColor: "bg-green-100 dark:bg-[#00bf2b]"
    },
    {
      title: "Pending Payments",
      value: "515",
      icon: <HiClock className="w-6 h-6 text-[#cc9a06] dark:text-white" />,
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    }
  ];

  // Payment Metrics Data
  const paymentMetrics = [
    {
      title: "Total Revenue",
      value: "$34,000.00",
      icon: <HiBanknotes className="w-6 h-6 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Pending Revenue",
      value: "$12,000.00",
      icon: <HiClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Payment Conversion Rate",
      value: "71%",
      icon: <Percent className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
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
              <ChevronDown className="w-4 h-4" />
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

      {/* Main Content */}
      <div className="p-6 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Enrollment Metrics */}
        <div className="mb-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">Enrolment Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCards.map((metric, index) => (
          <Card key={index} className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-5">
                    <div className={`p-3 rounded-xl mr-5 ${metric.bgColor}`}>
                      {metric.icon}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.title}
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mt-1 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>


        {/* Payment Metrics */}
        <div className="mb-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-200">Payment Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentMetrics.map((metric, index) => (
          <Card key={index} className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-5">
                    <div className={`p-3 rounded-xl mr-5 ${metric.bgColor}`}>
                      {metric.icon}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.title}
                    </div>
                  </div>
                  <div className="text-2xl font-semibold mt-1 dark:text-white">
                    {metric.value}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Popular Courses Card */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HiFire className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-[20px] dark:text-gray-200">Popular Courses</h3>
                </div>
                <HiArrowsUpDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 mb-4"></div>
              <div className="space-y-3">
                {["Frontend Development", "Backend Development (Java)", "UI/UX Design", 
                  "CV, Cover Letter and Interviewing Techniques", "Product Owner"].map((course, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{index + 1}.</span>
                    <span className="text-sm dark:text-gray-300">{course}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories Card */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <HiStar className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <h3 className="font-medium text-[20px] dark:text-gray-200">Categories by Popularity</h3>
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 mb-4"></div>
              <div className="space-y-3">
                {["Product Development", "Product Design", "Product Management", "Job Readiness"]
                  .map((category, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">{index + 1}.</span>
                      <span className="text-sm dark:text-gray-300">{category}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Cohorts Card */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <HiMiniCalendarDays className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <h3 className="font-medium text-[20px] dark:text-gray-200">Upcoming Cohorts</h3>
              </div>
              <div className="border-b border-gray-300 dark:border-gray-700 mb-4"></div>
              <div className="space-y-3">
                {["March - June, 2025 Cohort (Begins Mar 4th)", 
                  "August - November, 2025 Cohort (Begins Aug 11th)"].map((cohort, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{index + 1}.</span>
                    <span className="text-sm dark:text-gray-300">{cohort}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;