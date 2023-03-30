import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o Componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(ButtonDetails);
    const TitleEl = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(TitleEl).toHaveTextContent(/pikachu details/i);
    expect(ButtonDetails).not.toBeInTheDocument();

    const Sumary = screen.getByRole('heading', {
      name: /summary/i,
    });

    expect(Sumary).toHaveTextContent('Summary');

    const SumaryText = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );

    expect(SumaryText).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(ButtonDetails);

    const TitleLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(TitleLocation).toHaveTextContent(/game locations of pikachu/i);

    const ImageLocations = screen.getAllByRole('img');
    expect(ImageLocations[1].src).toBe('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(ImageLocations[1].alt).toBe('Pikachu location');
    expect(ImageLocations[2].src).toBe('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(ImageLocations[2].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);
    const ButtonDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(ButtonDetails);

    const Checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(Checkbox).toBeInTheDocument();

    const TextCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(TextCheckbox).toBeInTheDocument();

    userEvent.click(Checkbox);

    const Link = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(Link);

    const PokemonName = screen.getByText(/pikachu/i);
    expect(PokemonName).toBeInTheDocument();
  });
});
