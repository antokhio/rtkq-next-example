import { wrapper } from "@/store";
import { pokemonApi, usePokemonsQuery } from "@/store/api";
import { Paper, Stack, Typography } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const { isFallback } = useRouter();
  const { data } = usePokemonsQuery(undefined, {
    skip: isFallback,
    selectFromResult: ({ data }) =>
      data ? { data: data.results } : { data: [] },
  });

  return (
    <Paper>
      <Typography>Hello</Typography>
      <Stack rowGap={1}>
        {data.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            {pokemon.name}
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  store.dispatch(pokemonApi.endpoints.pokemons.initiate(undefined));

  await Promise.all(store.dispatch(pokemonApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
