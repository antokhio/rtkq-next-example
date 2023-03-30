import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { AppState } from "..";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://pokeapi.co/api/v2`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as AppState).user?.jwt;
    //   if (token) headers.set("authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
