"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pacifico } from "next/font/google";
import { ChevronsDown } from "@/animations/ChevronsDown";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});
export default function Header() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return (
    <header className="p-2 md:p-4 relative border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 flex-1">
          <Image
            src="/LogoWithoutText.png"
            alt="CodeLingo-Logo"
            height={80}
            width={80}
            className="filter brightness-0"
          />
          <h3
            className={`${pacifico.className} text-xl md:text-2xl hidden md:block`}
          >
            CodeLingo
          </h3>
        </Link>
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 flex-1 justify-center">
          <Link href="/" className="lg:text-base cursor-pointer hover:text-teal-600 transition-colors">Home Page</Link>
          <Link href="/learn-coding" className="lg:text-base cursor-pointer hover:text-teal-600 transition-colors">Course List</Link>
          <Link href="/dashboard" className="lg:text-base cursor-pointer hover:text-teal-600 transition-colors">User Dashboard</Link>
          <div
            className="flex items-center gap-1 cursor-pointer select-none"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <h3 className="lg:text-base hover:text-teal-600 transition-colors">More Options</h3>
            <ChevronsDown className="w-4 h-4" isHovered={dropdownOpen} />
          </div>
        </nav>
        <div className="flex items-center gap-2 flex-1 justify-end">
          {status === "authenticated" && session?.user ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                {session.user.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white">
                    <FaUser />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium">
                  {session.user.name?.split(' ')[0] || 'User'}
                </span>
              </div>
              
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    onMouseEnter={() => setProfileDropdownOpen(true)}
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <IoMdLogOut className="text-gray-500" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/auth/signup">
                <button
                  type="button"
                  className="border border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 transition-colors"
                >
                  Join
                </button>
              </Link>
              <Link href="/auth/login">
                <button
                  type="button"
                  className="text-white bg-teal-700 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 transition-colors"
                >
                  Login
                </button>
              </Link>
            </>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-2 p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="p-4 space-y-4">
              {status === "authenticated" && session?.user && (
                <div className="p-2 border-b border-gray-100 mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    {session.user.image ? (
                      <Image 
                        src={session.user.image} 
                        alt="Profile" 
                        width={40} 
                        height={40} 
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white">
                        <FaUser size={18} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full mt-2 text-left px-3 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                  >
                    <IoMdLogOut className="text-gray-500" />
                    Sign out
                  </button>
                </div>
              )}
              <div className="space-y-3">
                <Link href="/" className="font-medium text-gray-800 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  Home Page
                </Link>
                <Link href="/learn-coding" className="font-medium text-gray-800 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  Course List
                </Link>
                <Link href="/dashboard" className="font-medium text-gray-800 p-2 hover:bg-gray-100 rounded cursor-pointer">
                  User Dashboard
                </Link>
                <div>
                  <div 
                    className="font-medium text-gray-800 p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    More Options
                    <svg 
                      className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {mobileDropdownOpen && (
                    <div className="pl-6 mt-2 space-y-3 border-l-2 border-gray-200 ml-2">
                      <Link href="/courses" className="text-sm text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        Learn Coding
                      </Link>
                      <Link href="/dashboard" className="text-sm text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        Progress Tracker
                      </Link>
                      <div className="text-sm text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        Community Forum
                      </div>
                      <div className="text-sm text-gray-700 p-2 hover:bg-gray-100 rounded cursor-pointer">
                        Support Center
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden bg-gray-50 border-t border-gray-200 mt-2 p-6 rounded-lg shadow-sm"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Main Navigation</h4>
                <ul className="space-y-4">
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <Link href="/courses" className="font-medium text-gray-800 block">Learn Coding</Link>
                    <div className="text-xs text-gray-500 mt-1">Explore our interactive coding courses today!</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <Link href="/dashboard" className="font-medium text-gray-800 block">Progress Tracker</Link>
                    <div className="text-xs text-gray-500 mt-1">Track your coding journey and achievements.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Community Forum</div>
                    <div className="text-xs text-gray-500 mt-1">Join discussions with fellow coding enthusiasts.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Support Center</div>
                    <div className="text-xs text-gray-500 mt-1">Get help with any coding questions.</div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Additional Resources</h4>
                <ul className="space-y-4">
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Blog Posts</div>
                    <div className="text-xs text-gray-500 mt-1">Read articles on coding trends and tips.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Webinars</div>
                    <div className="text-xs text-gray-500 mt-1">Attend live sessions with coding experts.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Coding Challenges</div>
                    <div className="text-xs text-gray-500 mt-1">Test your skills with fun coding tasks.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Feedback Form</div>
                    <div className="text-xs text-gray-500 mt-1">Share your thoughts and suggestions with us.</div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">User Engagement</h4>
                <ul className="space-y-4">
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Success Stories</div>
                    <div className="text-xs text-gray-500 mt-1">Read how others succeeded in coding.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Resource Library</div>
                    <div className="text-xs text-gray-500 mt-1">Access tools and materials for learning.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">Coding Events</div>
                    <div className="text-xs text-gray-500 mt-1">Participate in upcoming coding competitions.</div>
                  </li>
                  <li className="hover:bg-gray-100 p-2 rounded transition-colors cursor-pointer">
                    <div className="font-medium text-gray-800">User Testimonials</div>
                    <div className="text-xs text-gray-500 mt-1">Hear from our satisfied learners.</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold mb-3 text-gray-900">Quick Links</h4>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                <span className="hover:text-teal-600 cursor-pointer transition-colors">Contact Us</span>
                <span className="hover:text-teal-600 cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-teal-600 cursor-pointer transition-colors">Terms of Use</span>
                <span className="hover:text-teal-600 cursor-pointer transition-colors">FAQs</span>
                <span className="hover:text-teal-600 cursor-pointer transition-colors">Site Map</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
