import { Grid, Skeleton } from "@mui/material";
import { Container } from "@mui/system";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import Skeletons from "../components/Skeletons";


const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons(); // Quando componente for montado, chama 'getPokemons' (consumindo API)
  }, []);

  // Consumindo API
  // GET com Axios
  const getPokemons = () => {
    let endpoints = []; // urls dos 50 Pokemons (urls com mais informações de cada um)

    // Cria lista das urls dos 50 pokemons
    for (let i = 1; i <= 200; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    // GET para cada item do array (para cada url)
    const response = axios
      .all(endpoints.map((endpoint) => axios.get(endpoint))) // Percorre array de 'endpoints' e para cada 'endpoint' faz um get com o axios
      .then((res) => setPokemons(res)); // Insere a resposta no estado 'pokemons' (será um array de dados para cada um)

    /*     axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => setPokemons(res.data.results)) // Insere o que pegou da API no estado 'pokemons'
      .catch((err) => console.log(err)); */
  };

  const pokemonFilter = (name) => {
    let nameMinusculo = name.toLowerCase()

    let filterPokemons = [];    

    if (name === "") { // Se no campo 'Capturando...' estiver vazio
      getPokemons() // Chama a função 'getPokemons' (pega de novo da API e monta a lista)
    }

    for (let i in pokemons) { // Percorro estado 'pokemons'          
      if (pokemons[i].data.name.includes(nameMinusculo)) { // Se neste item(do array 'pokemons') tiver inclusa a letra (name) que peguei via parâmetro        
        filterPokemons.push(pokemons[i]); // Insere no array 'filterPokemons' este novo item (que foi pesquisado)
      }
    }
    setPokemons(filterPokemons); // Insere no estado 'pokemons' o que estiver em 'filterPokemons'
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      {/* Passando a função para o componente Navbar */}
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemons.length === 0 ? ( // Se não tiver nada em 'pokemons' (página ainda não carregada) faça... renderiza o componente 'Skeletons'
          <Skeletons />  
          ) : ( // Senão...
          // Para cada pokemon, renderiza um card Pokemon
          pokemons.map((pokemon, key) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
                types={pokemon.data.types}
              />
            </Grid>
            ))
          )}         
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
