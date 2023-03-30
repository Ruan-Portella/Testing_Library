import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByText(/pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    const average = screen.getByText(/average weight: 6\.0 kg/i);
    const image = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(image.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
    expect(average).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(namePokemon).toHaveTextContent(/pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', { name: /more details/i });
    expect(ButtonDetails.href).toBe('http://localhost/pokemon/25');
  });
  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(ButtonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(ButtonDetails);
    const Favorited = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(Favorited);
    const image = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(image.src).toBe('http://localhost/star-icon.svg');
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
