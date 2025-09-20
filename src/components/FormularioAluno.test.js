import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormularioAluno from './FormularioAluno';

const mockProps = {
  aluno: {
    nome: '',
    ra: '',
    curso: 'GE',
    turma: 1,
    statusMatricula: true
  },
  onSubmit: jest.fn(),
  isLoading: false,
  error: null,
  success: false,
  titulo: 'Teste Formulário'
};

// Wrapper para fornecer Router context
const FormularioWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

test('renders form fields correctly', () => {
  render(
    <FormularioWrapper>
      <FormularioAluno {...mockProps} />
    </FormularioWrapper>
  );
  
  // Verifica se os campos do formulário estão presentes usando labels exatos
  expect(screen.getByLabelText('Nome *')).toBeInTheDocument();
  expect(screen.getByLabelText('RA *')).toBeInTheDocument();
  expect(screen.getByLabelText('Curso *')).toBeInTheDocument();
  expect(screen.getByLabelText('Turma *')).toBeInTheDocument();
});

test('renders submit button', () => {
  render(
    <FormularioWrapper>
      <FormularioAluno {...mockProps} />
    </FormularioWrapper>
  );
  
  // O botão real é "Atualizar", não "Salvar"
  const submitButton = screen.getByRole('button', { name: /atualizar/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});

test('disables submit button when loading', () => {
  const loadingProps = { ...mockProps, isLoading: true };
  render(
    <FormularioWrapper>
      <FormularioAluno {...loadingProps} />
    </FormularioWrapper>
  );
  
  // Quando loading, o botão continua como "Atualizar" mas fica desabilitado
  const submitButton = screen.getByRole('button', { name: /atualizar/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});