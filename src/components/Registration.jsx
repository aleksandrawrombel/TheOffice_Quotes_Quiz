import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// REGISTER

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [username, setUsername] = useState('');

const Register = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[35rem] md:h-[35rem] flex justify-center items-center flex-col p-4 mb-5 overflow-hidden blackboard font-office_noto">
          {/* <form>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <button>Register</button>
          </form> */}
        </div>
      </div>
    </>
  );
};

export default Register;
