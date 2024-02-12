import React, { useState } from 'react';

const Header = () => {
  return (
    <header className="bg-office_gray h-15 m-10 p-3 rounded-xl">
      <ul className="flex justify-between items-center">
        <li className="border-black border-solid border-2 rounded-xl font-semibold hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out">
          <a href="" className="p-3 text-sm w-25 md:w-60 flex justify-center">
            The Office Quotes Quiz
          </a>
        </li>
        <li className="border-black border-solid border-2 rounded-xl font-semibold hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out">
          <a href="" className="p-3 text-sm w-15 md:w-60 flex justify-center">
            Log in
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
