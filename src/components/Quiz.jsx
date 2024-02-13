import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';

const Quiz = () => {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    fetch('https://officeapi.akashrajpurohit.com/quote/random')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setQuote(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="border-white border-solid border-2 rounded-xl font-semibold w-[25rem] md:w-[40rem] h-[15rem] md:h-[15rem] bg-black flex justify-center items-center p-4 mb-5 overflow-hidden">
        <h1 className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed">{quote.quote}</h1>
      </div>
      <section className="flex mb-1">
        <button
          type="submit"
          className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
        >
          {quote.character}
        </button>
        <button
          type="submit"
          className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
        >
          AUTHOR
        </button>
      </section>
      <section className="flex mb-1">
        <button
          type="submit"
          className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
        >
          AUTHOR
        </button>
        <button
          type="submit"
          className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
        >
          AUTHOR
        </button>
      </section>
    </>
  );
};

export default Quiz;
