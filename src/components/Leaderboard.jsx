import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Leaderboard = ({ name, score }) => {
  // ADD NAME AND SCORE TO SUPABASE

  async function insertData(name, score) {
    try {
      const { data, error } = await supabase.from('Leaderboard').insert([{ username: name, score: score }]);
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
        .select('*')
        .order('score', { ascending: false })
        .limit(10);
      if (error) {
        throw error;
      }
      setLeaderboardData(data);
    } catch (error) {
      console.log('error', error.message);
    }
  }

  useEffect(() => {
    insertData(name, score);
    getData();
  }, [name, score]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] bg-black flex justify-center items-center flex-col p-4 mb-5 overflow-hidden">
        <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`Congratulations, ${name}!`}</p>
        <p className="text-white text-[1rem] md:text-[1.2rem] leading-relaxed">{`You scored ${score} points!`}</p>
      </div>
      <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[22rem] md:h-[30rem] bg-black flex justify-center items-center p-4 mb-5 overflow-hidden">
        <table className="border-separate border-spacing-x-10 md:border-spacing-x-36">
          <thead className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed text-center">
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => {
              const currentUser = user.username === name && user.score === score;
              return (
                <tr
                  key={user.id}
                  className={`text-white text-[1rem] md:text-[1.5rem] leading-relaxed ${
                    currentUser ? 'text-green-500 animate-pulse' : ''
                  }`}
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
      <div className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold text-l w-[20rem] md:w-[40rem] h-[5rem] md:h-[5rem] flex justify-center items-center p-4 mb-5 overflow-hidden cursor-pointer animate-pulse">
        <button className="text-black text-[1rem] md:text-[1.25rem] leading-relaxed">Sign up</button>
      </div>
    </div>
  );
};

export default Leaderboard;
