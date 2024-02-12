import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';
import Loading from './Loading';
import Quiz from './Quiz';

const Start = ({ setName }) => {
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setName(inputName);
        setLoading(false);
        setGameStarted(true);
      }, 4_000);
    }
  }, [loading]);

  const handleGameStart = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <main className="flex flex-col justify-center items-center h-[70vh]">
      {!gameStarted && !loading && (
        <>
          <div className="border-white border-solid border-2 rounded-xl font-semibold w-[25rem] md:w-[40rem] h-[15rem] md:h-[15rem] bg-black flex justify-between items-center p-4">
            <h1 className="text-white text-[1.75rem] md:text-[3rem]">The Office Quotes Quiz</h1>
            <img src={theOffice_logo} alt="The Office logo" className="w-48 md:w-52 h-48 md:h-52" />
          </div>
          <form className="flex flex-col justify-center items-center h-[10rem]" onSubmit={handleGameStart}>
            <input
              className="p-3 m-5 bg-office_gray border-black border-solid border-2 rounded-xl font-semibold text-l w-60 md:flex justify-center text-center"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            ></input>
            {inputName && (
              <button
                type="submit"
                className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-60 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out animate-pulse"
              >
                Start
              </button>
            )}
          </form>
        </>
      )}
      {loading && <Loading />}
      {gameStarted && <Quiz />}
    </main>
  );
};

export default Start;
