import React, { useState, useEffect } from 'react';
import Register from './Registration';
import supabase from './supabase';
import dundie from '../assets/dundie_icon.png';
import refresh_icon from '../assets/refresh_icon.svg';
import Quiz from './Quiz';

const Leaderboard = ({ score, name }) => {
  const [registration, setRegistration] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  // game restart state
  const [showQuiz, setShowQuiz] = useState(false);

  // GET DATA FROM SUPABASE AND RENDER 10 BEST SCORES

  const [leaderboardData, setLeaderboardData] = useState([]);

  async function getData() {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('score, username')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        // console.log(error.message);
        throw error;
      }

      const leaderboardData = data.map((player) => ({
        username: player.username,
        score: player.score,
      }));

      setLeaderboardData(leaderboardData);
      // console.log(data);
      checkCurrentUser();
    } catch (error) {
      // console.log(error.message);
    }
  }

  // REGISTRATION BUTTON

  const handleSignUp = () => {
    setRegistration(true);
  };

  useEffect(() => {
    getData();
    checkCurrentUser();
  }, []);

  // CHECK IF USER IS LOGGED IN

  async function checkCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      setLoggedInUser(false);
      // console.log(user);
    } else {
      setLoggedInUser(true);
      // console.log(user);
    }
  }

  // GAME RESTART
  const handleRestart = () => {
    setShowQuiz(true);
  };

  // HANDLE LEADERBOARD REFRESH

  async function handleRefresh() {
    getData();
  }

  return (
    <>
      {registration ? (
        <Register score={score} />
      ) : (
        <>
          {!showQuiz && (
            <>
              <img
                src={dundie}
                alt="dundie award designed by kelsljohnson"
                className="w-25 md:w-52 h-20 md:h-48 absolute right-[0.2rem] md:right-[34rem] top-[12rem] md:top-[10rem] animate-bounce"
              />
              <div className="flex flex-col justify-center items-center">
                <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] flex justify-center items-center flex-col p-4 mb-5 overflow-hidden blackboard font-office_chalk">
                  <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`Congratulations, ${
                    name || 'to you'
                  }!`}</p>
                  <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`You scored ${score} points!`}</p>
                </div>
                <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[22rem] md:h-[30rem] flex justify-center items-center p-4 mb-5 overflow-hidden blackboard">
                  <span className="self-start" onClick={handleRefresh}>
                    <img
                      src={refresh_icon}
                      alt="refresh icon"
                      className="w-5 md:w-7 md:mt-1 hover:scale-125 active:scale-105"
                    />
                  </span>
                  <table className="border-separate border-spacing-x-[1.8rem] md:border-spacing-x-[5rem]">
                    <thead className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed text-center font-office_chalk">
                      <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((user, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-white text-[0.8rem] md:text-[1.3rem] leading-relaxed font-office_chalk"
                          >
                            <td>{`${index + 1}.`}</td>
                            <td className="text-center">{user.username}</td>
                            <td className="text-center">{user.score}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {loggedInUser === false && (
                  <div className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-[20rem] md:w-[25rem] text-center p-4 mb-5 overflow-hidden cursor-pointer hover:bg-office_button transition duration-300 hover:scale-105 hover:drop-shadow-2xl animate-pulse">
                    <button className="text-black text-[1rem] md:text-[1rem] leading-relaxed" onClick={handleSignUp}>
                      Register to join the leaderboard
                    </button>
                  </div>
                )}
                {loggedInUser && (
                  <div className="bg-office_gray rainbow border-black border-solid border-2 rounded-full font-semibold text-l w-[20rem] md:w-[25rem] text-center p-4 mb-5 overflow-hidden cursor-pointer hover:bg-office_button transition duration-300 hover:scale-105 hover:drop-shadow-2xl animate-pulse">
                    <button className="text-black text-[1rem] md:text-[1rem] leading-relaxed" onClick={handleRestart}>
                      Play again
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {showQuiz && <Quiz time={15} />}
        </>
      )}
    </>
  );
};

export default Leaderboard;
