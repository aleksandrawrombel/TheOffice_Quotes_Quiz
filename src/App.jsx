import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import LogIn from './components/LogIn';

const App = () => {
  const [logInStatus, setLogInStatus] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleLogInClick = () => {
    setShowLogIn(true);
  };

  const updateLoginStatus = (isLoggedIn) => {
    setLogInStatus(isLoggedIn);
  };

  const handleLogOut = () => {
    setLogInStatus(false);
    setShowLogIn(false);
  };

  return (
    <>
      <Header
        logInStatus={logInStatus}
        setLogInStatus={setLogInStatus}
        handleLogInClick={handleLogInClick}
        setShowLogIn={setShowLogIn}
        handleLogOut={handleLogOut} 
      />
      {!showLogIn && <Start setName={setName} />}
      {showLogIn && <LogIn updateLoginStatus={updateLoginStatus} />}
      <Footer />
    </>
  );
};

export default App;
