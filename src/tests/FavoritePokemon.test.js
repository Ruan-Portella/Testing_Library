import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Ao favoritar a partir da página de detalhes teste se:', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const NoFavorite = screen.getByText(/no favorite pokémon found/i);
    expect(NoFavorite).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const MoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(MoreDetails);
    const Favorited = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(Favorited);
    const LinkFavorited = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(LinkFavorited);
    const FavoritedPokemon = screen.getByText(/pikachu/i);
    expect(FavoritedPokemon).toBeInTheDocument();
  });
});
