import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FavoriteInput extends Component {
  render() {
    const { onUpdateFavoritePokemon, isFavorite } = this.props;
    return (
      <form className="favorite-form">
        <label htmlFor="favorite">
          { `Pokémon favoritado?` }
          <input
            type="checkbox"
            id="favorite"
            checked={ isFavorite }
            onChange={
              ({ target: { checked } }) => onUpdateFavoritePokemon(checked)
            }
          />
        </label>
      </form>
    );
  }
}

FavoriteInput.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onUpdateFavoritePokemon: PropTypes.func.isRequired,
};

export default FavoriteInput;
