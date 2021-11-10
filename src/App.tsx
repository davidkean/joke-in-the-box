import "./App.scss";
import React, { useEffect, useState } from "react";
import { makeResponsive, SpringGrid } from "react-stonecutter";
import { useGetJokesQuery } from "./api/jokes/jokes.api";
import { IJoke } from "./global/interfaces";
import { Joke, Toggle } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Grid = makeResponsive(SpringGrid, { maxWidth: 4000 });

const App: React.FC = () => {
   const NUM_OF_JOKES = 20;
   const { data: jokesApiResponse = [] } = useGetJokesQuery(NUM_OF_JOKES);

   const [jokes, setJokes] = useState<IJoke[]>([]);
   const [isShowingLikedJokes, setIsShowingLikedJokes] =
      useState<boolean>(false);

   const jokeList: IJoke[] = isShowingLikedJokes
      ? jokes.filter((joke: IJoke) => joke.isLiked)
      : jokes;

   useEffect(() => {
      if (jokesApiResponse) {
         setJokes(jokesApiResponse);
      }
   }, [jokesApiResponse]);

   const toggleLiked = (jokeId: number) => {
      const updatedJokes: IJoke[] = jokes.map((joke: IJoke) => {
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
            <Grid
               component="ul"
               columns={10}
               columnWidth={300}
               gutterWidth={40}
               gutterHeight={190}
               springConfig={{ stiffness: 170, damping: 26 }}
            >
               {jokeList.map((joke: IJoke) => {
                  return (
                     <li key={joke.id}>
                        <Joke
                           joke={joke}
                           isLiked={joke.isLiked}
                           onLikeBtnClick={() => toggleLiked(joke.id)}
                        />
                     </li>
                  );
               })}
            </Grid>
         </section>
      </section>
   );
};

export default App;
