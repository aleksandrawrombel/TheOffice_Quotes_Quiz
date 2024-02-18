import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import start from '../assets/start_giphy.gif';
import success from '../assets/success_giphy.gif';

const LogIn = ({ supabase }) => {
  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // log in status state
  const [logInStatus, setLogInStatus] = useState('');
  const [error, setError] = useState('');
  // game start state
  const [gameStart, setGameStart] = useState(false);

  async function handleLogIn(e) {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
      setLogInStatus('Logged in!');
      setError('');
      console.log(logInStatus);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setLogInStatus('Log In failed!');
      console.log(logInStatus);
    }
  }

  async function handleLogOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      setLogInStatus('');
      setError('');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  const handleGameStart = () => {
    setGameStart(true);
  };

  if (gameStart) {
    return <Quiz time={15} />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="flex flex-col justify-center items-center">
        <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[35rem] md:h-[35rem] flex justify-center items-center flex-col p-4 overflow-hidden blackboard font-office_noto">
          {logInStatus !== 'Logged in!' ? (
            <>
              <img
                src={start}
                alt="the office let's do this gif via giphy.com"
                className="w-48 h-44 md:w-56 md:h-52 m-6"
              />
              <form className="flex flex-col justify-center items-center h-[14rem]" onSubmit={handleLogIn}>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 m-1 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-60 md:flex justify-center text-center focus:outline-4 outline-black"
                ></input>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="p-3 m-1 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-60 md:flex justify-center text-center focus:outline-4 outline-black"
                ></input>
                {error && (
                  <span className="text-[0.8rem] p-1 m-1 text-red-600 w-[14rem] text-center border-red-800 border-dashed border-2 rounded-full font-semibold">
                    Oh no, there's an error!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={logInStatus === 'Logged in!'}
                  className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 m-6 text-l w-60 md:flex justify-center rainbow hover:scale-105 hover:drop-shadow-2xl"
                >
                  Log in!
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[14rem]">
              <p className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed font-office_chalk text-center m-6">
                Log in succesful 😎
              </p>
              <img src={success} alt="the office party gif via giphy.com" className="w-48 h-44 md:w-56 md:h-52 m-6" />
              <button
                className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-60 md:flex justify-center rainbow hover:scale-105 hover:drop-shadow-2xl m-1 mt-5"
                onClick={handleGameStart}
              >
                Start
              </button>
              <button
                className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 m-1 text-l w-60 md:flex justify-center hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
