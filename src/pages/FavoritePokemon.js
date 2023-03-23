import React from 'react';
import PropTypes from 'prop-types';

import { pokemonType } from '../types';

import './favorite-pokemon.css';
import { Pokemon } from '../components';

const ZERO = 0;

class FavoritePokemon extends React.Component {
  render() {
    const { pokemonList } = this.props;
    const isEmpty = pokemonList.length === ZERO;

    return (
      <div>
        <h2>Favorite Pokémon</h2>
        { isEmpty ? (
          <div>
            <p>{ `No favorite Pokémon found` }</p>
          </div>
        ) : (
          pokemonList.map((pokemon) => (
            <div key={ pokemon.id } className="favorite-pokemonList">
              <Pokemon pokemon={ pokemon } isFavorite />
            </div>
          ))
        ) }
      </div>
    );
  }
}

FavoritePokemon.propTypes = {
  pokemonList: PropTypes.arrayOf(pokemonType.isRequired),
};

FavoritePokemon.defaultProps = {
  pokemonList: [],
};

export default FavoritePokemon;
