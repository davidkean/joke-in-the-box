import "./App.scss";
import React, { useEffect, useState } from "react";
import { useGetJokesQuery } from "./api/jokes/jokes.api";
import { IJoke } from "./global/interfaces";
import { Joke } from "./components";

const App: React.FC = () => {
   const { data: jokesApiResponse = [] } = useGetJokesQuery("20");

   const [jokes, setJokes] = useState<IJoke[]>([]);

   useEffect(() => {
      if (jokesApiResponse) {
         setJokes(jokesApiResponse);
      }
   }, [jokesApiResponse]);

   const toggleLiked = (jokeId: number) => {
      console.log("this will be something soon");
   };

   return (
      <section className="joke-app">
         <header className="joke-app__header">
            <h1 className="title">
               JOKE<span className="title--small">INTHE</span>BOX
            </h1>
         </header>
         <section className="joke-app__content">
            {jokes.map((joke: IJoke) => {
               return (
                  <Joke
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
