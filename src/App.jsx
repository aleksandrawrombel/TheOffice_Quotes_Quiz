import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';

const App = () => {

    const [username, setUsername] = useState("");


  return (
    <>
      <Header />
      <Start setName={setUsername} />
      <Footer />
    </>
  );
};

export default App;
