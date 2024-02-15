import React, { useState } from 'react';
import '../style/main.css';

const Header = () => {
  return (
    <header className="bg-office_gray h-15 m-10 p-3 rounded-full">
      <ul className="flex justify-between items-center">
        <li className="border-black border-solid border-2 rounded-full font-semibold hover:bg-office_button transform transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
          <a href="" className="p-3 text-sm w-25 md:w-60 flex justify-center">
            The Office Quotes Quiz
          </a>
        </li>
        <li className="border-black border-solid border-2 rounded-full font-semibold hover:bg-office_button transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
          <a href="" className="p-3 text-sm w-15 md:w-60 flex justify-center">
            Log in
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
