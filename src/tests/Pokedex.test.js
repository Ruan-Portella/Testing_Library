import { getAllByTestId, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon;', () => {
    renderWithRouter(<App />);
    const Title = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });
    expect(Title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const Button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(Button);
    const NamePokemon = screen.getByText(/charmander/i);
    expect(NamePokemon).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const Image = screen.getAllByRole('img');
    expect(Image).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const FilterButton = screen.getAllByTestId('pokemon-type-button');
    FilterButton.forEach((button) => {
      userEvent.click(button);
      const Type = screen.getByTestId('pokemon-type');
      expect(button).toHaveTextContent(Type.innerHTML);
      const buttonAll = screen.getByRole('button', {
        name: /all/i,
      });
      expect(buttonAll).toBeInTheDocument();
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toBeInTheDocument();
  });
});
