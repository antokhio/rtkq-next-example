import { api } from ".";

type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
};

type PokemonsResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Pokemon[];
};

export const pokemonApi = api
  .enhanceEndpoints({ addTagTypes: ["pokemon"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      pokemons: builder.query<PokemonsResponse, undefined>({
        query: () => `/pokemon`,
      }),
      pokemon: builder.query<Pokemon, string>({
        query: (name) => `/pokemon/${name}`,
      }),
    }),
  });

export const { usePokemonsQuery, usePokemonQuery } = pokemonApi;
