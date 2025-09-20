import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormularioAluno from '../components/FormularioAluno';
import { alunosService } from '../services/alunosService';

const EditarAluno = () => {
  const [aluno, setAluno] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const carregarAluno = useCallback(async () => {
    try {
      setIsLoadingData(true);
      setError(null);
      const data = await alunosService.buscarPorId(id);
      setAluno(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingData(false);
    }
  }, [id]);

  useEffect(() => {
    carregarAluno();
  }, [carregarAluno]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await alunosService.atualizar(id, formData);
      
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

  if (isLoadingData) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando dados do aluno...</p>
      </div>
    );
  }

  if (error && !aluno) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Erro!</h4>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={carregarAluno}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="alert alert-success text-center">
        <h4 className="alert-heading">Sucesso!</h4>
        <p>Aluno atualizado com sucesso!</p>
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
        <h1>Editar Aluno</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <h6 className="alert-heading">Erro ao atualizar aluno:</h6>
          {error}
        </div>
      )}

      {aluno && (
        <FormularioAluno 
          aluno={aluno}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EditarAluno;