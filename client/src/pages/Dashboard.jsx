import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { Search, Sun, Moon, User, ChevronDown, Percent, } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { HiArrowsUpDown, HiBanknotes, HiClock, HiFire, HiMiniCalendarDays, HiStar } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';
import { MdCreditScore, MdRecentActors } from 'react-icons/md';
import { logoutUser, updateLastActivity } from '../redux/authSlice'; // Import the logout action


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const INACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000;

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useTheme();

  // State for metrics
  const [totalApplications, setTotalApplications] = useState(0);
  const [paidEnrollments, setPaidEnrollments] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);

  // State for payment metrics
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingRevenue, setPendingRevenue] = useState(0);
  const [paymentConversionRate, setPaymentConversionRate] = useState(0);

  useEffect(() => {
    // Function to update last activity timestamp
    const handleActivity = () => {
      dispatch(updateLastActivity());
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Set up inactivity check interval
    const checkInactivity = () => {
      const lastActivity = store.getState().auth.lastActivity;
      const now = Date.now();
      
      if (now - lastActivity >= INACTIVITY_TIMEOUT) {
        handleLogout();
      }
    };

    // Check for inactivity every minute
    const inactivityInterval = setInterval(checkInactivity, 60000);

    // Set initial activity timestamp
    handleActivity();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(inactivityInterval);
    };
  }, [dispatch]);

  // Fetch data from the backend
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchApplications();
    }
  }, [isAuthenticated, navigate]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('https://tecvinson-web-server.vercel.app/api/applications');
      const data = await response.json();

      if (response.ok) {
        // Calculate metrics
        const total = data.applications.length;
        const paid = data.applications.filter(app => app.paymentStatus === 'Paid').length;
        const pending = data.applications.filter(app => app.paymentStatus === 'Pending').length;

        // Calculate payment metrics
        const totalRev = data.applications
          .filter(app => app.paymentStatus === 'Paid')
          .reduce((sum, app) => sum + app.courseCost, 0);

        const pendingRev = data.applications
          .filter(app => app.paymentStatus === 'Pending')
          .reduce((sum, app) => sum + app.courseCost, 0);

        const conversionRate = total > 0 ? ((paid / total) * 100).toFixed(2) : 0;

        // Update state
        setTotalApplications(total);
        setPaidEnrollments(paid);
        setPendingPayments(pending);
        setTotalRevenue(totalRev);
        setPendingRevenue(pendingRev);
        setPaymentConversionRate(conversionRate);
      } else {
        console.error('Failed to fetch applications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Dispatch logout action and wait for it to complete
      await dispatch(logoutUser()).unwrap();
      
      // Remove token from local storage
      localStorage.removeItem('token');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // You might want to show an error message to the user
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

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
      value: totalApplications,
      icon: <MdRecentActors className="w-6 h-6 text-[#1b8598] dark:text-[white]" />,
      bgColor: "bg-blue-100 dark:bg-[#1b8598]"
    },
    {
      title: "Paid Enrolments",
      value: paidEnrollments,
      icon: <MdCreditScore className="w-6 h-6 text-[#00bf2b] dark:text-white" />,
      bgColor: "bg-green-100 dark:bg-[#00bf2b]"
    },
    {
      title: "Pending Payments",
      value: pendingPayments,
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#cc9a06] dark:text-white"
        >
          <path
            d="M18.8334 16.8V14.5C18.8334 14.3667 18.7834 14.25 18.6834 14.15C18.5834 14.05 18.4667 14 18.3334 14C18.2 14 18.0834 14.05 17.9834 14.15C17.8834 14.25 17.8334 14.3667 17.8334 14.5V16.775C17.8334 16.9083 17.8584 17.0375 17.9084 17.1625C17.9584 17.2875 18.0334 17.4 18.1334 17.5L19.6584 19.025C19.7584 19.125 19.875 19.175 20.0084 19.175C20.1417 19.175 20.2584 19.125 20.3584 19.025C20.4584 18.925 20.5084 18.8083 20.5084 18.675C20.5084 18.5417 20.4584 18.425 20.3584 18.325L18.8334 16.8ZM18.3584 22C16.9584 22 15.7709 21.5167 14.7959 20.55C13.8209 19.5833 13.3334 18.4 13.3334 17C13.3334 15.6 13.8209 14.4167 14.7959 13.45C15.7709 12.4833 16.9584 12 18.3584 12C19.7417 12 20.9167 12.4875 21.8834 13.4625C22.85 14.4375 23.3334 15.6167 23.3334 17C23.3334 18.3833 22.85 19.5625 21.8834 20.5375C20.9167 21.5125 19.7417 22 18.3584 22ZM4.33337 20C3.78337 20 3.31254 19.8042 2.92087 19.4125C2.52921 19.0208 2.33337 18.55 2.33337 18V6C2.33337 5.45 2.52921 4.97917 2.92087 4.5875C3.31254 4.19583 3.78337 4 4.33337 4H20.3334C20.8834 4 21.3542 4.19583 21.7459 4.5875C22.1375 4.97917 22.3334 5.45 22.3334 6V9.825C22.3334 10.1083 22.2375 10.3458 22.0459 10.5375C21.8542 10.7292 21.6167 10.825 21.3334 10.825C21.05 10.825 20.8125 10.7292 20.6209 10.5375C20.4292 10.3458 20.3334 10.1083 20.3334 9.825V8H4.33337V12H11.8334C12.1167 12 12.325 12.1333 12.4584 12.4C12.5917 12.6667 12.5667 12.925 12.3834 13.175C12.0167 13.725 11.7334 14.325 11.5334 14.975C11.3334 15.625 11.2334 16.3 11.2334 17C11.2334 17.3167 11.2542 17.6292 11.2959 17.9375C11.3375 18.2458 11.4 18.5417 11.4834 18.825C11.5667 19.1083 11.5209 19.375 11.3459 19.625C11.1709 19.875 10.9417 20 10.6584 20H4.33337Z"
            fill="#CC9A06"
          />
        </svg>
      ),
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    }
    
  ];

  // Payment Metrics Data
  const paymentMetrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <HiBanknotes className="w-6 h-6 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Pending Revenue",
      value: `$${pendingRevenue.toLocaleString()}`,
      icon: <HiClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Payment Conversion Rate",
      value: `${paymentConversionRate}%`,
      icon: <Percent className="w-6 h-6 text-[#1B8598] dark:text-blue-400" />,
      bgColor: "bg-[#D2F8FF] dark:bg-blue-900/30"
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
                    onClick={handleLogout} // Use handleLogout here
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