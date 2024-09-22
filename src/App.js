// App.js
import React, { useState, useEffect } from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Outlet,Route, Routes, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import SideBar from "./components/SideBar";
import LoginPage from "./components/LoginPage";
import PasswordReset from './components/PasswordReset';
import Receipt from './pages/Receipt';
import Stock_movement from './pages/Stock_movement';
import Status from './pages/Pick_ticket';
import { FaSignOutAlt } from "react-icons/fa"; // Importing the log out icon

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faWarehouse, faReceipt,faArrowRight,faTruck, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

// Importing colorful icons from React Icons library
import { AiOutlineSetting, AiOutlineStock } from 'react-icons/ai'; // Icon for settings and stock
import { FaTruck, FaClipboardCheck, FaReceipt, FaWarehouse } from 'react-icons/fa'; // Icons for truck, status change, receipt, warehouse
import { MdReceipt } from 'react-icons/md'; // Alternative colorful icon for receipt
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Sidebar options configuration
const options = {
  WMS: [
    { name: "Stock Movement", url: "/WMS/stock_movement"},
    { name: "Status Change", url: "/WMS/pick_ticket" },
    { name: "Receipt", url: "/WMS/receipt" },
  ],
};

// Header options extracted from sidebar options
const headerOptions = Object.keys(options);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to toggle sidebar visibility
  const [userEmail, setUserEmail] = useState(''); // State to user visibility
  const [currentDate, setCurrentDate] = useState(''); // State to current date visibility
  const [showOptions, setShowOptions] = useState(false); // State to toggle options dropdown


  const navigate = useNavigate();

  // Use useEffect to set the current date when the component mounts
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(); // Format the date as needed
    setCurrentDate(formattedDate);
  }, []);

  const handleLogin = (email, password) => {
    // Example authentication logic
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsAuthenticated(true);
      setUserEmail(email);
      navigate('/'); // Redirect to the main page
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Redirect to the login page after logout
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions); // Toggle the options dropdown visibility
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/reset" element={<PasswordReset />} />
        </>
      ) : (
        <>
          <Route path="/" element={
            <div className="pp">
              <header className="flex items-center justify-between bg-gray-300 p-4 m-2 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-300 w-16 h-14 flex items-center justify-center m-1">
                    <img src='/SVStackLogo.png' alt='logo' className='w-30 h-20 object-cover'></img>
                    {/* <span>Logo</span> */}
                  </div>
                  <div className="text-6xl font-bold">SV Stack</div>
                </div>
                <div className="flex items-center space-x-4 justify-center">
                  <div className="bg-gray-300 p-2 text-center">
    {/* Flex container for labels and values */}
    <div className="flex flex-col items-start space-y-2">
      {/* Flex item for User */}
      <div className="flex justify-between w-full">
        <strong className="mr-2">User : </strong>
        <span> {userEmail}</span>
      </div>
      {/* Flex item for Date */}
      <div className="flex justify-between ">
        <strong className="mr-2">Date : </strong>
        <span> {currentDate}</span>
      </div>
    </div>
                  </div> 



                  <div className="relative">
                    {/* Gear icon to toggle options dropdown */}
                    <FontAwesomeIcon icon={faGear} onClick={toggleOptions} className="cursor-pointer" />
                    
                    {/* Options dropdown */}
                    {showOptions && (
                      <div className="absolute right-0 mt-2 w-32 bg-blue-200 shadow-md rounded-lg z-50">
                        <button
                          className="flex items-center p-2 w-full hover:bg-blue-400 hover:text-white hover:font-bold transition-colours durations-200"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="mr-2" />
                          Log Out
                        </button>
                      </div>)}
                  </div>
                </div>
              </header>
              <header>
                <div className="bg-gray-300 p-4 flex space-x-2 rounded-lg m-2 h-16">
                  {headerOptions.map((x) => (
                    <button className="headerr flex flex-col items-center justify-center h-full p-2" key={x} onClick={()=> x ==='WMS' &&setIsSidebarVisible(!isSidebarVisible)}>
                      {x === 'WMS' ? (
                        
                        <div className='wms-box'>                       
                         <FontAwesomeIcon icon={faWarehouse} className='faWarehouse' />
                         <span>WMS</span>

                        </div>
                    
                         
                        ):(
                         <span>{x}</span> )}
                    
                    </button>
                  ))}

                </div>
              </header>
              <main className="flex flex-1 h-[cacl(100vh-160px)]">
                <SideBar links={options.WMS} isCollapsed={!isSidebarVisible} onToggle={toggleSidebar} />
                <section className={`Hero flex-1 p-4 transition-all duration-300 ${isSidebarVisible ? 'ml-1/4' : 'ml-16'}`}>
                  <Outlet/>
                </section>
              </main>
            </div>
          } />
          <Route path="/WMS/stock_movement" element={<Stock_movement />} />
          <Route path="/WMS/pick_ticket" element={<Status />} />
          <Route path="/WMS/receipt" element={<Receipt />} />
        </>
      )}
    </Routes>
  );
}

export default App;













