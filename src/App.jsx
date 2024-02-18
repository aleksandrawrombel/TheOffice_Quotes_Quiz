import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import LogIn from './components/LogIn';

const App = () => {
  const [logInStatus, setLogInStatus] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogInClick = () => {
    setShowLogIn(true); 
  }

  return (
    <>
      <Header setLogInStatus={setLogInStatus} handleLogInClick={handleLogInClick} />
      {!showLogIn && <Start setEmail={setEmail} />}
      {showLogIn && <LogIn />}
      <Footer />
    </>
  );
};

export default App;
