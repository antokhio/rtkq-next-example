import { makeStore, wrapper } from "@/store";
import { pokemonApi, usePokemonQuery } from "@/store/api";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface PokemonPageProps {
  name: string;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ name }) => {
  const { isFallback: skip, query } = useRouter();
  const { data } = usePokemonQuery(
    typeof query.name === "string" ? query.name : skipToken,
    { skip }
  );

  return (
    <Card>
      <CardHeader title={data?.name} />
      <CardMedia
        component="img"
        image={data?.sprites?.front_default}
        sx={{ height: 200, width: 200 }}
      />
    </Card>
  );
};

export default PokemonPage;

export const getStaticPaths = async () => {
  const store = makeStore();
  const { data } = await store.dispatch(
    pokemonApi.endpoints.pokemons.initiate(undefined)
  );

  if (!data) throw new Error("no paths");
  return {
    paths: data.results.map(({ name }) => ({ params: { name } })),
    fallback: true,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      if (typeof params === "undefined") throw new Error("no params");
      const { name } = params;

      if (typeof name === "string") {
        store.dispatch(pokemonApi.endpoints.pokemon.initiate(name));
      }

      await Promise.all(
        store.dispatch(pokemonApi.util.getRunningQueriesThunk())
      );

      return {
        props: {
          name,
        },
      };
    }
);
