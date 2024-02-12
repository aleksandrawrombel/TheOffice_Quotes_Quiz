import React, { useState } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';

const Start = () => {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-[70vh]">
        <div className="border-white border-solid border-2 rounded-xl font-semibold w-[25rem] md:w-[40rem] h-[15rem] md:h-[15rem] bg-black flex justify-between items-center p-4">
          <h1 className="text-white text-[1.75rem] md:text-[3rem]">The Office Quotes Quiz</h1>
          <img src={theOffice_logo} alt="The Office logo" className="w-48 md:w-52 h-48 md:h-52" />
        </div>
        <form className="flex flex-col justify-center items-center">
          <input
            className="p-3 m-5 bg-office_gray border-black border-solid border-2 rounded-xl font-semibold text-l w-60 md:flex justify-center text-center"
            placeholder="Enter your name"
          ></input>
          <button
            type="submit"
            className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-60 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out animate-pulse"
          >
            Start
          </button>
        </form>
      </main>
    </>
  );
};

export default Start;
