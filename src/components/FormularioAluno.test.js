import React from 'react';
import { render, screen } from '@testing-library/react';
import FormularioAluno from './FormularioAluno';

const mockProps = {
  aluno: {
    nome: '',
    ra: '',
    curso: '',
    turma: '',
    statusMatricula: true
  },
  onSubmit: jest.fn(),
  isLoading: false,
  error: null,
  success: false,
  titulo: 'Teste Formulário'
};

test('renders form fields correctly', () => {
  render(<FormularioAluno {...mockProps} />);
  
  // Verifica se os campos do formulário estão presentes
  expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/RA \(Registro Acadêmico\)/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Curso/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Turma/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Status da matrícula/i)).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<FormularioAluno {...mockProps} />);
  
  const submitButton = screen.getByRole('button', { name: /salvar/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();
});

test('disables submit button when loading', () => {
  const loadingProps = { ...mockProps, isLoading: true };
  render(<FormularioAluno {...loadingProps} />);
  
  const submitButton = screen.getByRole('button', { name: /salvando.../i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});