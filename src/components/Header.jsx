import React, { useState, useEffect } from 'react';
import '../style/main.css';
import logout_icon from '../assets/logout_icon.svg';
import supabase from './supabase';

const Header = ({ setLogInStatus, handleLogInClick, logInStatus, setShowLogIn }) => {
  // currently logged in user state
  const [currentUser, setCurrentUser] = useState('');

  const handleLogIn = () => {
    setLogInStatus(true);
  };

  // LOG OUT BUTTON

  async function handleLogOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // console.log(error.message);
        throw error;
      }
      setLogInStatus(false);
      setShowLogIn(false);
      // console.log('user logged out!');
    } catch (error) {
      // console.log(error.message);
    }
  }

  // CURRENTLY LOGGED IN USER

  async function getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      // console.log(error);
    } else {
      // console.log(user.email);
      setCurrentUser(user.email);
    }
  }

  // getCurrentUser();

  useEffect(() => {
    getCurrentUser();
  });

  return (
    <>
      <header className="bg-office_gray h-15 m-10 p-3 rounded-full">
        <ul className="flex justify-between items-center">
          <li className="border-black border-solid border-2 rounded-full font-semibold hover:bg-office_button transform transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
            <a href="" className="p-3 text-sm w-25 md:w-60 flex justify-center">
              The Office Quotes Quiz
            </a>
          </li>
          {!logInStatus ? (
            <li className="border-black border-solid border-2 rounded-full font-semibold hover:bg-office_button transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
              <a
                href="#"
                className="p-3 text-sm w-15 md:w-60 flex justify-center"
                onClick={() => {
                  handleLogInClick();
                  getCurrentUser();
                }}
              >
                Log in
              </a>
            </li>
          ) : (
            <div className="flex">
              <li className="hidden md:flex md:border-black md:border-solid md:border-2 md:rounded-full md:font-semibold md:mr-1">
                <div className="p-3 text-sm w-25 md:w-60 flex justify-center">{currentUser}</div>
              </li>
              <div className="flex justify-center items-center">
                <button
                  className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-sm w-15 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <img
                    src={logout_icon}
                    alt="logout icon"
                    className="w-5 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl"
                  />
                </button>
              </div>
            </div>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
