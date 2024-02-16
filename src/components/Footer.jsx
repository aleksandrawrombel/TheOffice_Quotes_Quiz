import React, { useState } from 'react';
import github_logo from '../assets/github_logo.png';

const Footer = () => {
  return (
    <footer className="bg-office_gray h-15 m-10 p-3 rounded-full hover:drop-shadow-xl">
      <ul className="flex justify-between items-center">
        <li className="border-black border-solid border-2 rounded-full font-semibold hover:bg-office_button hover:shadow-lg transition duration-300 hover:scale-105 hover:drop-shadow-2xl">
          <a
            href="https://github.com/aleksandrawrombel/TheOffice_Quotes_Quiz"
            target="_blank"
            className="p-3 text-sm w-25 md:w-60 hidden md:flex justify-center"
          >
            Check the code on Github!
          </a>
          <a
            href="https://github.com/aleksandrawrombel/TheOffice_Quotes_Quiz"
            target="_blank"
            className="text-sm w-25 md:w-60 flex justify-center md:hidden"
          >
            <img src={github_logo} className="p-1 h-11" />
          </a>
        </li>
        <p className="text-[0.7rem] md:text-[0.9rem] text-black text-opacity-60  mr-2 md:mr-8">
          Ola's The Office Quotes Quiz &#169;2024
        </p>
      </ul>
    </footer>
  );
};

export default Footer;
