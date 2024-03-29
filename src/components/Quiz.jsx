import React, { useState, useEffect } from 'react';
import theOffice_logo from '../assets/theOffice_logo.png';
import characters from '../assets/characters';
import Leaderboard from './Leaderboard';
import FlyingTarget from './FlyingTarget';
import '../style/main.css';
import Michael from '../assets/Michael_Icon.png';
import supabase from './supabase';

const Quiz = ({ time, name }) => {
  // quote fetching state
  const [quote, setQuote] = useState([]);
  const [incorrectOptions, setIncorrectOptions] = useState([]);
  // randomizer state
  const [randomOption, setRandomOption] = useState([]);
  // score state
  const [score, setScore] = useState(0);
  // timer and end of the quiz state
  const [timer, setTimer] = useState(time);
  const [quizFinished, isQuizFinished] = useState(false);
  // last 10 seconds of the timer state
  const [lastTenSeconds, setLastTenSeconds] = useState(false);
  // button animation
  const [buttonColors, setButtonColors] = useState(['#E3E2EA', '#E3E2EA', '#E3E2EA', '#E3E2EA']);
  const [buttonAnimations, setButtonAnimations] = useState([false, false, false, false]);
  // flying target state
  const [flyingTargetVisible, setFlyingTargetVisible] = useState(true);
  // currently logged in user state
  const [currentUser, setCurrentUser] = useState('');

  // FETCHING THE QUOTE

  useEffect(() => {
    fetchQuote();
    getCurrentUser();
  }, []);

  // fetch a random quote, max 200 characters long

  const fetchQuote = () => {
    fetch('https://officeapi.akashrajpurohit.com/quote/random')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        if (response && response.quote.length <= 200) {
          setQuote(response);
          createIncorrectOptions(response.character);
        } else {
          fetchQuote();
        }
      })
      .catch((error) => {
        // console.log(error);
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
      charactersCopy.splice(randomIndex, 1);
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
      setScore((prev) => prev + 100);
    }
    setTimeout(() => {
      setButtonColors(['#E3E2EA', '#E3E2EA', '#E3E2EA', '#E3E2EA']);
      setButtonAnimations([false, false, false, false]);
      fetchQuote();
    }, 280);
  };

  // TIMER

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
        if (timer <= 10) {
          setLastTenSeconds(true);
        } else {
          setLastTenSeconds(false);
        }
      } else {
        clearInterval(interval);
        isQuizFinished(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // timer formatted to display seconds go by correctly

  const formattedTimer = `${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`;

  // BUTTONS ANIMATION

  const handleButton = (button, index) => {
    if (quote.character === button) {
      const newButtonColors = [...buttonColors];
      newButtonColors[index] = '#47ff47';
      setButtonColors(newButtonColors);

      const newButtonAnimations = [...buttonAnimations];
      newButtonAnimations[index] = true;
      setButtonAnimations(newButtonAnimations);
    } else {
      const newButtonColors = [...buttonColors];
      newButtonColors[index] = 'tomato';
      setButtonColors(newButtonColors);

      const newButtonAnimations = [...buttonAnimations];
      newButtonAnimations[index] = true;
      setButtonAnimations(newButtonAnimations);
    }
  };

  // HANDLE FLYING TARGET CLICK
  const handleFlyingTargetClick = () => {
    setTimer((prev) => prev + 10);
    setFlyingTargetVisible(false);
  };

  // CURRENTLY LOGGED IN USER

  async function getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      // console.log(error);
    } else {
      // console.log(user.email);
      setCurrentUser(user.email);
    }
  }

  // getCurrentUser();

  // INSERT EMAIL AND SCORE TO PLAYERS TABLE IN SUPABASE

  async function insertData() {
    try {
      const { data: existingPlayers, error: fetchError } = await supabase
        .from('players')
        .select()
        .eq('email', currentUser);

      if (fetchError) {
        throw fetchError;
      }
      if (existingPlayers && existingPlayers.length > 0) {
        const playerId = existingPlayers[0].player_id;

        const { data: updatedPlayer, error: updateError } = await supabase
          .from('players')
          .update({ score: score })
          .eq('player_id', playerId);

        if (updateError) {
          throw updateError;
        }

        // console.log('Score updated for existing player:', updatedPlayer);
      } else {
        const { data, error } = await supabase
          .from('players')
          .insert([{ email: currentUser, score: score, username: username }]);

        if (error) {
          throw error;
        }

        // console.log('Success: Email and score inserted into players table', data);
      }
    } catch (error) {
      // console.error('Error inserting/updating data in players table:', error.message);
    }
  }

  //RENDER
  return (
    <>
      {quizFinished ? (
        (insertData(), (<Leaderboard score={score} name={name}/>))
      ) : (
        <>
          {lastTenSeconds ? (
            <>
              {flyingTargetVisible && <FlyingTarget onClick={handleFlyingTargetClick} />}
              <div className="absolute left-1 top-[5rem] md:left-[12rem] md:top-[10rem]">
                <img
                  src={Michael}
                  alt="Michael Scott by marisajlivingston"
                  className="m-10 h-10 md:w-20 md:h-20 ml-12 mb-2"
                />
                <div className="bubble top">
                  {flyingTargetVisible
                    ? 'Catch the Dunder Mifflin logo to get 10 more seconds!'
                    : "That's what WHO said?!"}
                </div>
              </div>
            </>
          ) : (
            <div className="absolute left-1 top-[5rem] md:left-[12rem] md:top-[10rem]">
              <img
                src={Michael}
                alt="Michael Scott by marisajlivingston"
                className="m-10 h-10 md:w-20 md:h-20 ml-12 mb-2"
              />
              <div className="bubble top">That's what WHO said?!</div>
            </div>
          )}
          <div className="flex ml-40 mt-[7.7rem] md:-mt-[4rem] md:ml-[60rem]">
            <div className="bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] flex flex-col justify-center items-center mr-3 md:mr-6">
              <span>Score:</span>
              <span>{score}</span>
            </div>
            <div
              className={`bg-office_gray border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] flex flex-col justify-center items-center mb-6 ${
                lastTenSeconds ? 'pulse-red' : ''
              }`}
            >
              <span>Timer:</span>
              <span>{formattedTimer}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="border-white border-solid border-2 rounded-xl font-semibold w-[20rem] md:w-[40rem] h-[13rem] md:h-[15rem] flex justify-center items-center p-4 mb-5 overflow-hidden blackboard">
              <h1 className="text-white text-[1rem] md:text-[1.5rem] leading-relaxed font-office_chalk"
              data-testid="quote">
                {quote.quote}
              </h1>
            </div>
          </div>
          <section className="flex mb-1">
            {randomOption.slice(0, 2).map((button, index) => (
              <button
                key={index}
                type="submit"
                className={`border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-40 md:w-60 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-[0.1rem] md:m-3 cursor-pointer hover:scale-105 ${
                  buttonAnimations[index] ? 'tada' : ''
                }`}
                onClick={() => {
                  handleAnswer(button);
                  handleButton(button, index);
                }}
                style={{ backgroundColor: buttonColors[index] }}
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
                className={`border-black border-solid border-2 rounded-full font-semibold p-3 text-l w-40 md:w-60 hover:bg-office_button hover:shadow-lg transition duration-300 ease-in-out m-[0.1rem] md:m-3 cursor-pointer hover:scale-105 ${
                  buttonAnimations[index + 2] ? 'tada' : ''
                }`}
                onClick={() => {
                  handleAnswer(button);
                  handleButton(button, index + 2);
                }}
                style={{ backgroundColor: buttonColors[index + 2] }}
              >
                {button}
              </button>
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default Quiz;
