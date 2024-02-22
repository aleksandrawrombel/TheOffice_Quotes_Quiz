import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';
import Loading from './Loading';
import Quiz from './Quiz';
import charactersIcons from '../assets/characters_icons';
import '../style/main.css';

const Start = ({ setName }) => {
  // username state
  const [inputName, setInputName] = useState('');
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

  const handleGameStart = () => {
    setLoading(true);
  };

  return (
    <>
      {!gameStarted && !loading && (
        <div className="snowflake">
          {charactersIcons.map((icon, index) => (
            <div className="snowflake" key={index}>
              <img className=" w-10 h-10 md:w-20 md:h-20" src={icon} alt="character icon" />
            </div>
          ))}
        </div>
      )}
      <main className="flex flex-col justify-center items-center h-[65vh] md:h-[70vh]">
        {!gameStarted && !loading && (
          <>
            <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[15rem] md:h-[15rem] bg-black flex justify-between items-center p-4 z-20">
              <h1 className="text-white text-[1.2rem] md:text-[3rem]">The Office Quotes Quiz</h1>
              <img src={theOffice_logo} alt="The Office logo" className="w-48 md:w-52 h-48 md:h-52" />
            </div>
            <form className="flex flex-col justify-center items-center h-[13rem]" noValidate>
              <input
                className="p-3 m-5 mt-11 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-64 md:w-80 md:flex justify-center text-center focus:outline-4 outline-black z-20"
                placeholder="Enter your name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              ></input>
              {inputName && (
                <button
                  type="submit"
                  className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-64 md:w-80 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out animate-pulse hover:scale-105 hover:drop-shadow-2xl z-20"
                  onClick={handleGameStart}
                >
                  Start
                </button>
              )}
            </form>
          </>
        )}
        {loading && <Loading />}
        {gameStarted && <Quiz time={29} name={inputName} />}
      </main>
    </>
  );
};

export default Start;
