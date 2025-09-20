import React from 'react';
import { render, screen } from '@testing-library/react';
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

test('renders application without crashing', () => {
  render(<App />);
  // Verifica se elementos básicos da aplicação estão presentes
  const titleElement = screen.getByText('Sistema de Gestão de Alunos');
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation menu', () => {
  render(<App />);
  // Verifica se o menu de navegação está presente
  const brandLink = screen.getByText('Sistema de Alunos');
  const homeLink = screen.getByText('Home');
  
  expect(brandLink).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});