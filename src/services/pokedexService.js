export const readFavoritePokemonIds = () => (
  JSON.parse(localStorage.getItem('favoritePokemonIds')) || []
);

const saveFavoritePokemon = (pokemonList) => (
  localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemonList))
);

const addPokemonToFavorites = (pokemonId) => {
  const favoritePokemon = readFavoritePokemonIds();
  const newFavoritePokemon = [...favoritePokemon, pokemonId];

  saveFavoritePokemon(newFavoritePokemon);
};

const removePokemonFromFavorites = (pokemonId) => {
  const favoritePokemon = readFavoritePokemonIds();
  const newFavoritePokemon = favoritePokemon.filter((id) => id !== pokemonId);

  saveFavoritePokemon(newFavoritePokemon);
};

export const updateFavoritePokemon = (pokemonId, isFavorite) => (
  isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId)
);
