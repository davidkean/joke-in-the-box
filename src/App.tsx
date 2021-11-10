import "./App.scss";
import React, { useEffect, useState } from "react";
import { useGetJokesQuery } from "./api/jokes/jokes.api";
import { IJoke } from "./global/interfaces";
import { Joke, Toggle } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
   const { data: jokesApiResponse = [] } = useGetJokesQuery("20");

   const [jokes, setJokes] = useState<IJoke[]>([]);
   const [isShowingLikedJokes, setIsShowingLikedJokes] =
      useState<boolean>(false);

   const jokeList = isShowingLikedJokes
      ? jokes.filter((joke: IJoke) => joke.isLiked)
      : jokes;

   useEffect(() => {
      if (jokesApiResponse) {
         setJokes(jokesApiResponse);
      }
   }, [jokesApiResponse]);

   const toggleLiked = (jokeId: number) => {
      const updatedJokes = jokes.map((joke: IJoke) => {
         return jokeId === joke.id ? { ...joke, isLiked: !joke.isLiked } : joke;
      });
      setJokes(updatedJokes);
   };

   return (
      <section className="joke-app">
         <header className="joke-app__header">
            <h1 className="title">
               JOKE<span className="title--small">INTHE</span>BOX
            </h1>

            <div className="show-liked">
               <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
               <Toggle
                  isChecked={isShowingLikedJokes}
                  onToggle={() => setIsShowingLikedJokes(!isShowingLikedJokes)}
               />
            </div>
         </header>
         <section className="joke-app__content">
            {jokeList.map((joke: IJoke) => {
               return (
                  <Joke
                     key={joke.id}
                     joke={joke}
                     isLiked={joke.isLiked}
                     onLikeBtnClick={() => toggleLiked(joke.id)}
                  />
               );
            })}
         </section>
      </section>
   );
};

export default App;
