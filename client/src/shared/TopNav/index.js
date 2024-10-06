import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { usePublicContext } from "../../providers/PublicContextProvider";
import { deleteUserCookies } from "../../utils/methods";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopNav = () => {
  const [nav, setNav] = useState(false);
  const { isLog } = usePublicContext();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    deleteUserCookies();
    navigate('/login')
    window.location.reload();
  };

  const navItems = [
    isLog
      ? { id: 1, text: "Logout", onClick: handleLogout }
      : { id: 1, text: "Login", path: "/login" },
    isLog ? null : { id: 2, text: "SignUp", path: "/signup" },
  ].filter((item) => item);

  return (
    <div className='mx-auto flex h-24 max-w-[1980px] items-center justify-between bg-white px-4 text-black shadow-lg'>
      <h1 className='w-full text-3xl font-bold text-[#fbbf24]'>Coursati</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems?.map((item) => (
          <li
            key={item.id}
            className='m-2 cursor-pointer rounded-xl p-4 duration-300 hover:bg-[#fbbf24] hover:text-black'
          >
            {item.path ? (
              <Link to={item.path}>{item.text}</Link>
            ) : (
              <button onClick={item.onClick}>{item.text}</button> 
            )}
          </li>
        ))}
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? "fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-white duration-500 ease-in-out md:hidden z-50"
            : "fixed bottom-0 left-[-100%] top-0 w-[60%] duration-500 ease-in-out"
        }
      >
        <h1 className='m-4 w-full text-3xl font-bold text-[#fbbf24]'>REACT.</h1>
        {navItems?.map((item) => (
          <li
            key={item.id}
            className='cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-[#fbbf24] hover:text-black'
          >
            {item.path ? (
              <Link to={item.path}>{item.text}</Link>
            ) : (
              <button onClick={item.onClick}>{item.text}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopNav;
