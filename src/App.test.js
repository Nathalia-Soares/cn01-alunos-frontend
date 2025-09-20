import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock do alunosService para evitar chamadas reais à API durante os testes
jest.mock('./services/alunosService', () => ({
  alunosService: {
    listarTodos: jest.fn(() => Promise.resolve([])),
    buscarPorId: jest.fn(() => Promise.resolve({})),
    criar: jest.fn(() => Promise.resolve({})),
    atualizar: jest.fn(() => Promise.resolve({})),
    excluir: jest.fn(() => Promise.resolve()),
    testarConexao: jest.fn(() => Promise.resolve({ success: true }))
  }
}));

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

test('renders application without crashing', () => {
  render(<AppWrapper />);
  // Verifica se elementos básicos da aplicação estão presentes
  const linkElement = screen.getByText(/Sistema de Gerenciamento de Alunos/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navigation menu', () => {
  render(<AppWrapper />);
  // Verifica se o menu de navegação está presente
  const homeLink = screen.getByText(/Início/i);
  const alunosLink = screen.getByText(/Alunos/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(alunosLink).toBeInTheDocument();
});