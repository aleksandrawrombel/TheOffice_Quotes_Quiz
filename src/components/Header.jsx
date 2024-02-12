import React, { useState } from 'react';

const Header = () => {
  return (
    <header className="bg-office_gray h-15 m-10 p-3 rounded-xl">
      <ul className="flex justify-between items-center">
        <li className="border-black border-solid border-2 rounded-xl w-60 flex justify-center font-semibold hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out">
          <a href="#" className="block p-3">
            The Office Quotes Quiz
          </a>
        </li>
        <li className="border-black border-solid border-2 rounded-xl w-60 flex justify-center font-semibold hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out">
          <a href="#" className="block p-3">
            Log in
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
