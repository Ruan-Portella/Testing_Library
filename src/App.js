import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  readFavoritePokemonIds,
  updateFavoritePokemon,
} from './services/pokedexService';

import pokemonList from './data';
import Routes from './routes';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: this.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemon(pokemonId, isFavorite) {
    updateFavoritePokemon(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: this.setIsPokemonFavoriteById() }));
  }

  setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemonList.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  render() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemon = pokemonList.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link className="link" to="/">{`Home`}</Link>
          <Link className="link" to="/about">{`About`}</Link>
          <Link className="link" to="/favorites">{`Favorite Pokémon`}</Link>
        </nav>
        <Routes
          favoritePokemon={ favoritePokemon }
          pokemonList={ pokemonList }
          isPokemonFavoriteById={ isPokemonFavoriteById }
          onUpdateFavoritePokemon={
            (pokemonId, checked) => this.onUpdateFavoritePokemon(pokemonId, checked)
          }
        />
      </div>
    );
  }
}

export default App;
