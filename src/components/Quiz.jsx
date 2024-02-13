import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';
import characters from '../assets/characters';

const Quiz = () => {
  const [quote, setQuote] = useState([]);
  const [incorrectOptions, setIncorrectOptions] = useState([]);
  const [randomOption, setRandomOption] = useState([]);
  const [score, setScore] = useState(0);

  // FETCHING THE QUOTE

  useEffect(() => {
    fetchQuote();
  }, []);

  //fetch a random quote, max 200 characters long

  const fetchQuote = () => {
    fetch('https://officeapi.akashrajpurohit.com/quote/random')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response && response.quote.length <= 200) {
          setQuote(response);
          createIncorrectOptions(response.character);
        } else {
          fetchQuote();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // INCORRECT ANSWERS

  const createIncorrectOptions = (correctAuthor) => {
    const incorrectOptions = [];
    const charactersCopy = [...characters];

    // remove the correct author from copied characters array
    charactersCopy.splice(
      charactersCopy.findIndex((character) => character.name === correctAuthor),
      1
    );

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * charactersCopy.length);
      incorrectOptions.push(charactersCopy[randomIndex].name);
    }

    setIncorrectOptions(incorrectOptions);
    randomize(correctAuthor, incorrectOptions);
  };

  // RANDOMIZE BUTTONS

  const randomize = (correctAuthor, incorrectOptions) => {
    const options = [correctAuthor, ...incorrectOptions];

    // Fisher-Yates shuffle algorithm
    for (let i = options.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [options[i], options[randomIndex]] = [options[randomIndex], options[i]];
    }
    setRandomOption(options);
  };

  // SCORING

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === quote.character) {
      setScore((prev) => prev + 1);
    }
    fetchQuote();
  };

  //RENDER

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 m-3 text-center self-end">
          Score: {score}
        </div>
        <div className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 m-3 text-center mb-6 self-end">
          Timer
        </div>
        <div className="border-white border-solid border-2 rounded-xl font-semibold w-[25rem] md:w-[40rem] h-[15rem] md:h-[15rem] bg-black flex justify-center items-center p-4 mb-5 overflow-hidden">
          <h1 className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed">{quote.quote}</h1>
        </div>
      </div>
      <section className="flex mb-1">
        {randomOption.slice(0, 2).map((button, index) => (
          <button
            key={index}
            type="submit"
            className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 md:w-60 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
            onClick={() => handleAnswer(button)}
          >
            {button}
          </button>
        ))}
      </section>
      <section className="flex mb-1">
        {randomOption.slice(2, 4).map((button, index) => (
          <button
            key={index}
            type="submit"
            className="bg-office_gray border-black border-solid border-2 rounded-xl font-semibold p-3 text-l w-40 md:w-60 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-3"
            onClick={() => handleAnswer(button)}
          >
            {button}
          </button>
        ))}
      </section>
    </>
  );
};

export default Quiz;
