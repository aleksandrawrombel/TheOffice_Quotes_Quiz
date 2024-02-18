import React, { useState, useEffect } from 'react';
import '../style/main.css';
import success from '../assets/success_giphy.gif';
import LogIn from './LogIn';

// REGISTER

const Register = ({ supabase }) => {
  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  // registration status state
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [error, setError] = useState('');
  // logged in state
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    // PASSWORD VALIDATION
    if (password !== confirmPassword) {
      setError('Password do not match!');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      setRegistrationStatus('Registered!');
      console.log(registrationStatus);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setRegistrationStatus('Registration failed!');
      console.log(registrationStatus);
    }

    // USERNAME VALIDATION
    const validUsernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!validUsernameRegex.test(username)) {
      setError('Username must be between 3 and 20 characters long, no special characters allowed.');
      return;
    }
  }

  // CHECK IF LOGGED IN

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <>
        <LogIn supabase={supabase} />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[35rem] md:h-[35rem] flex justify-center items-center flex-col p-4 mb-5 overflow-hidden blackboard font-office_noto">
          {registrationStatus !== 'Registered!' ? (
            <>
              <p className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed font-office_chalk text-center mb-5">
                Register to join the global leaderboard and compete with the best!
              </p>
              <form onSubmit={handleRegister} className="flex flex-col">
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
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="p-3 m-1 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-60 md:flex justify-center text-center focus:outline-4 outline-black"
                ></input>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="p-3 m-1 bg-office_gray border-black border-solid border-2 rounded-full font-semibold text-l w-60 md:flex justify-center text-center focus:outline-4 outline-black"
                ></input>
                {error && (
                  <span className="text-[0.8rem] p-1 m-2 ml-3 text-red-600 w-[14rem] text-center border-red-800 border-dashed border-2 rounded-full font-semibold">
                    Oh no, there's an error!
                  </span>
                )}
                <button
                  type="submit"
                  disabled={registrationStatus === 'Registered!'}
                  className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-60 m-1 md:flex justify-center rainbow hover:scale-105 hover:drop-shadow-2xl"
                >
                  Register
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed font-office_chalk text-center m-6">
                Registration succesful 😎
              </p>
              <img src={success} alt="the office party gif via giphy.com" className="w-48 h-44 md:w-56 md:h-52 m-6" />
              <button
                className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-60 md:flex justify-center rainbow hover:scale-105 hover:drop-shadow-2xl m-6"
                onClick={handleLogIn}
              >
                Log in!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
