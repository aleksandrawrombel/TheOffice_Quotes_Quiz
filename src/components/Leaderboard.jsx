import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Register from './Registration';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Leaderboard = ({ score, email }) => {
  const [registration, setRegistration] = useState(false);

  // ADD EMAIL AND SCORE TO SUPABASE

  async function insertData(email, score) {
    try {
      const { data, error } = await supabase.from('Leaderboard').insert([{ email: email, score: score }]);
      if (error) {
        throw error;
      }
      console.log('success', data);
      getData();
    } catch (error) {
      console.log('error:', error.message);
    }
  }

  // GET DATA FROM SUPABASE AND RENDER 10 BEST SCORES

  const [leaderboardData, setLeaderboardData] = useState([]);

  async function getData() {
    try {
      const { data, error } = await supabase
        .from('Leaderboard')
        .select('email, score')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.log(error);
        throw error;
      }

      setLeaderboardData(data);
      console.log(data);
    } catch (error) {
      console.log('error', error.message);
    }
  }

  // REGISTRATION BUTTON

  const handleSignUp = () => {
    setRegistration(true);
  };

  useEffect(() => {
    insertData(email, score);
    getData();
  }, [email, score]);

  return (
    <>
      {registration ? (
        <Register supabase={supabase} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] flex justify-center items-center flex-col p-4 mb-5 overflow-hidden blackboard font-office_chalk">
              <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">Congratulations!</p>
              <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`You scored ${score} points!`}</p>
            </div>
            <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[22rem] md:h-[30rem] flex justify-center items-center p-4 mb-5 overflow-hidden blackboard">
              <table className="border-separate border-spacing-x-2 md:border-spacing-x-[5rem]">
                <thead className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed text-center font-office_chalk">
                  <tr>
                    <th>Rank</th>
                    <th>Email</th>
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
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-[20rem] md:w-[25rem] text-center p-4 mb-5 overflow-hidden cursor-pointer hover:bg-office_button transition duration-300 hover:scale-105 hover:drop-shadow-2xl animate-pulse">
              <button className="text-black text-[1rem] md:text-[1rem] leading-relaxed" onClick={handleSignUp}>
                Sign up to join the leaderboard!
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Leaderboard;
