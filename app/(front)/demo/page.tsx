import axios from "axios";
import React from "react";

const fetchPlemons = async () => {
  const result = await axios.get("https://pokeapi.co/api/v2/pokemon/");

  const allPokemos: any = {};

  for (let i = 0; i < result.data.results.length; i++) {
    const singelPok = await axios.get(result.data.results[i].url);

    allPokemos[result.data.results[i].url || ""] = singelPok.data;
  }
  return allPokemos;
};

const page = async () => {
  const pokemonsNames = await fetchPlemons();
  console.log(pokemonsNames);

  return (
    <main className="flex flex-col items-center justify-center py-40">
      {/* {pokemonsNames.data.results.map((res: any) => (
        <div key={res.url}>{res.name}</div>
      ))} */}
    </main>
  );
};

export default page;
