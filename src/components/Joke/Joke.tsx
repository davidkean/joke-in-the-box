import "./Joke.scss";
import React from "react";
import { IJoke } from "../../global/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

interface IJokeListProps {
   joke: IJoke;
   isLiked: boolean;
   onLikeBtnClick: () => void;
}

export const Joke: React.FC<IJokeListProps> = ({
   joke,
   isLiked,
   onLikeBtnClick,
}) => {
   return (
      <article className="joke">
         <div className="joke__content">
            <section className={isLiked ? `setup setup--is-liked` : `setup`}>
               <h4>{joke.setup}</h4>
            </section>
            <section className="punchline">
               <h4>{joke.punchline}</h4>
               <FontAwesomeIcon
                  role="button"
                  aria-pressed={isLiked}
                  icon={faThumbsUp}
                  className={
                     isLiked ? "like-btn like-btn--is-liked" : "like-btn"
                  }
                  onClick={onLikeBtnClick}
               />
            </section>
         </div>
      </article>
   );
};
