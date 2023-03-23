import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { isPokemonFavoriteByIdType, pokemonType } from '../types';
import {
  About,
  FavoritePokemon,
  NotFound,
  Pokedex,
  PokemonDetails,
} from '../pages';

class Routes extends Component {
  render() {
    const {
      favoritePokemon, pokemonList, isPokemonFavoriteById, onUpdateFavoritePokemon,
    } = this.props;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Pokedex
              pokemonList={ pokemonList }
              isPokemonFavoriteById={ isPokemonFavoriteById }
            />
          ) }
        />
        <Route
          path="/pokemon/:id"
          render={ ({ match }) => (
            <PokemonDetails
              isPokemonFavoriteById={ isPokemonFavoriteById }
              match={ match }
              pokemonList={ pokemonList }
              onUpdateFavoritePokemon={ onUpdateFavoritePokemon }
            />
          ) }
        />
        <Route
          path="/favorites"
          render={ () => <FavoritePokemon pokemonList={ favoritePokemon } /> }
        />
        <Route path="/about" component={ About } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  onUpdateFavoritePokemon: PropTypes.func.isRequired,
  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,
  pokemonList: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
  favoritePokemon: PropTypes.arrayOf(pokemonType.isRequired).isRequired,
};

export default Routes;
