import React, { useState, useEffect } from 'react';

const Leaderboard = ({ score, name }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] bg-black flex justify-center items-center flex-col p-4 mb-5 overflow-hidden">
        <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`Congratulations, ${name}!`}</p>
        <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`You scored ${score} points!`}</p>
      </div>
      <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[30rem] md:h-[30rem] bg-black flex justify-center items-center p-4 mb-5 overflow-hidden">
        <p className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed">Leaderboard</p>
      </div>
      <div className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold text-l w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] flex justify-center items-center p-4 mb-5 overflow-hidden cursor-pointer animate-pulse">
        <button className="text-black text-[1rem] md:text-[1.25rem] leading-relaxed">Sign up</button>
      </div>
    </div>
  );
};

export default Leaderboard;
