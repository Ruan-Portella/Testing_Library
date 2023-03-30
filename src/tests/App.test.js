import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const Home = screen.getByRole('link', {
      name: /home/i,
    });
    const About = screen.getByRole('link', {
      name: /about/i,
    });
    const Favorites = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(Favorites).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const Home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(Home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const About = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(About);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const Favorites = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(Favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      const URL = '/ruan';
      history.push(URL);
    });
    const NotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(NotFound).toBeInTheDocument();
  });
});
