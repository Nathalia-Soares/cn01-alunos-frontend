import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioAluno from '../components/FormularioAluno';
import { alunosService } from '../services/alunosService';

const NovoAluno = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await alunosService.criar(formData);
      
      setSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/alunos');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success text-center">
        <h4 className="alert-heading">Sucesso!</h4>
        <p>Aluno cadastrado com sucesso!</p>
        <p>Redirecionando para a lista de alunos...</p>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Cadastrar Novo Aluno</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <h6 className="alert-heading">Erro ao cadastrar aluno:</h6>
          {error}
        </div>
      )}

      <FormularioAluno 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NovoAluno;