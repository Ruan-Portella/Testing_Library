import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from './Button';

class PokemonButtonsPanel extends Component {
  render() {
    const { pokemonTypes, filterPokemon } = this.props;
    return (
      <div className="pokedex-buttons-panel">
        <Button
          onClick={ () => filterPokemon('all') }
          className="filter-button"
        >
          All
        </Button>
        {pokemonTypes.map((type) => (
          <Button
            dataTestId={`pokemon-type-button`}
            key={ type }
            onClick={ () => filterPokemon(type) }
            className="filter-button"
          >
            {`${type}`}
          </Button>
        ))}
      </div>
    );
  }
}

PokemonButtonsPanel.propTypes = {
  pokemonTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterPokemon: PropTypes.func.isRequired,
};

export default PokemonButtonsPanel;
