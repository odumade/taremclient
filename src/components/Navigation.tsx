import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import Logo from '../assets/logo.png'

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <div className="w-full bg-white shadow">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger and Sidebar */}
          <div className="md:hidden">
            <FaIcons.FaBars
              onClick={showSidebar}
              className="text-2xl cursor-pointer"
            />
            <nav
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow transform transition-transform duration-300 z-50 ${
                sidebar ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <ul
                className="flex flex-col p-4 space-y-4"
                onClick={showSidebar}
              >
                <li className="self-end text-2xl">
                  <FaIcons.FaChevronLeft className="cursor-pointer" />
                </li>
                <li className="text-lg font-bold border-b pb-2">
                  Navigation
                </li>
                <li className="cursor-pointer hover:text-blue-600">Categories</li>
                <li className="cursor-pointer hover:text-blue-600">My Courses</li>
              </ul>
            </nav>
          </div>

          {/* Logo */}
          <img src={Logo} alt="logo" className="h-10 w-auto" />

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-blue-600">Categories</li>
            <li className="cursor-pointer hover:text-blue-600">Courses</li>
          </ul>
        </div>

        {/* Right Section: Search Bar */}
        <div className="hidden md:block">
          <form className="flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search Courses..."
              className="px-4 py-2 w-64 focus:outline-none"
            />
            <button className="px-4 bg-blue-600 text-white hover:bg-blue-700">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Navigation
