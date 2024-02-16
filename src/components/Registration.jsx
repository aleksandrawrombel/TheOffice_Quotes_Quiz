import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// REGISTER

// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

const Register = () => {
  return (
    <>
      <p>Registration</p>
    </>
  );
};

export default Register;
