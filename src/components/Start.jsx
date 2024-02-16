import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';
import Loading from './Loading';
import Quiz from './Quiz';

const Start = ({ setName }) => {
  // username and validation state
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');
  // loading page and quiz start state
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

  const validUsernameRegex = /^[a-zA-Z0-9]{3,20}$/;

  const handleGameStart = (e) => {
    e.preventDefault();

    if (!validUsernameRegex.test(inputName)) {
      setError('Username must be between 3 and 20 characters long, no special characters allowed.');
      return;
    }
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
          <form className="flex flex-col justify-center items-center h-[13rem]" noValidate>
            <input
              className="p-3 m-5 mt-11 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-60 md:flex justify-center text-center focus:outline-4 outline-black"
              placeholder="Enter your username"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            ></input>
            {inputName && (
              <button
                type="submit"
                className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-60 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out animate-pulse"
                onClick={handleGameStart}
              >
                Start
              </button>
            )}
          </form>
          {error && (
            <span className="text-[0.8rem] p-1 mb-5 text-red-800 w-[14rem] text-center border-red-800 border-dashed border-2 rounded-full font-semibold">
              {error}
            </span>
          )}
        </>
      )}
      {loading && <Loading />}
      {gameStarted && <Quiz time={59} name={inputName} />}
    </main>
  );
};

export default Start;
