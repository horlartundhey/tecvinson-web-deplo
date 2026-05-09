import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, User, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import { debounce } from 'lodash';

const Contacts = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { isDarkMode, setIsDarkMode } = useTheme();

  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const fetchContacts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await axios.get('https://tecvinson-web-server.vercel.app/api/contacts', {
        // 'http://localhost:5000/api/contacts'
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: { page, limit: 20, search: search.trim() || undefined },
      });
      setContacts(response.data.contacts);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response?.status === 401) navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setCurrentPage(1);
      fetchContacts(1, value);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (isAuthenticated) fetchContacts(currentPage, searchQuery);
  }, [currentPage, isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email or company"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border dark:border-gray-600 rounded-xl w-96 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <User className="w-5 h-5" />
              <ChevronDown className="w-4 h-4" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200">Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-red-500">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Contact Us Submissions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{total} total submissions</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">S/N</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Phone</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Company</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Services</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-500 dark:text-gray-400">Loading...</td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-500 dark:text-gray-400">No submissions found</td>
                  </tr>
                ) : (
                  contacts.map((contact, index) => (
                    <tr key={contact._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        {(currentPage - 1) * 20 + index + 1}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200">{contact.fullName}</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{contact.email}</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{contact.phone}</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{contact.companyName}</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex flex-wrap gap-1">
                          {(contact.services || []).map((s) => (
                            <span key={s} className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-xs">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                        {new Date(contact.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border dark:border-gray-600 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border dark:border-gray-600 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-6 dark:text-white">Contact Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Full Name', value: selectedContact.fullName },
                { label: 'Email', value: selectedContact.email },
                { label: 'Phone', value: selectedContact.phone },
                { label: 'Company', value: selectedContact.companyName },
                { label: 'Date', value: new Date(selectedContact.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium mb-1">{label}</p>
                  <p className="text-sm text-gray-900 dark:text-gray-200">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium mb-2">Services of Interest</p>
                <div className="flex flex-wrap gap-2">
                  {(selectedContact.services || []).map((s) => (
                    <span key={s} className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium mb-1">Note</p>
                <p className="text-sm text-gray-900 dark:text-gray-200 whitespace-pre-wrap">{selectedContact.note}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
