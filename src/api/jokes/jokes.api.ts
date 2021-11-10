import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJoke } from "../../global/interfaces";

export const jokesApi = createApi({
   reducerPath: "jokesApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "/",
   }),
   endpoints: (builder) => ({
      getJokes: builder.query<IJoke[], string>({
         query: (numberOfJokes) => `${numberOfJokes}`,
         transformResponse: (response: IJoke[]) =>
            response.map((joke: IJoke) => ({ ...joke, isLiked: false })),
      }),
   }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetJokesQuery } = jokesApi;
