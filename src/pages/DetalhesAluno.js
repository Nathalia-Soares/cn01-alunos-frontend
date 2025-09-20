import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { alunosService } from '../services/alunosService';
import { CURSOS, TURMAS } from '../constants/formOptions';

const DetalhesAluno = () => {
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const carregarAluno = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alunosService.buscarPorId(id);
      setAluno(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    carregarAluno();
  }, [carregarAluno]);

  const excluirAluno = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      try {
        await alunosService.excluir(id);
        navigate('/alunos');
      } catch (err) {
        alert(`Erro ao excluir aluno: ${err.message}`);
      }
    }
  };

  const getCursoLabel = (cursoCodigo) => {
    const curso = CURSOS.find(c => c.value === cursoCodigo);
    return curso ? curso.label : cursoCodigo;
  };

  const getTurmaLabel = (turmaNumero) => {
    const turma = TURMAS.find(t => t.value === turmaNumero);
    return turma ? turma.label : `${turmaNumero}º Semestre`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando dados do aluno...</p>
      </div>
    );
  }

  if (error) {
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

  if (!aluno) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Aluno não encontrado</h4>
        <p>O aluno solicitado não foi encontrado no sistema.</p>
        <Link to="/alunos" className="btn btn-primary">
          Voltar para Lista
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Detalhes do Aluno</h1>
        <div className="btn-group">
          <Link
            to={`/alunos/${aluno.id}/editar`}
            className="btn btn-warning"
          >
            <i className="fas fa-edit me-2"></i>
            Editar
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={excluirAluno}
          >
            <i className="fas fa-trash me-2"></i>
            Excluir
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Informações Pessoais</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Nome:</strong>
                </div>
                <div className="col-sm-9">
                  {aluno.nome}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>RA:</strong>
                </div>
                <div className="col-sm-9">
                  <code>{aluno.ra}</code>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Curso:</strong>
                </div>
                <div className="col-sm-9">
                  <span className="badge bg-primary me-2">{aluno.curso}</span>
                  {getCursoLabel(aluno.curso)}
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-sm-3">
                  <strong>Turma:</strong>
                </div>
                <div className="col-sm-9">
                  <span className="badge bg-info me-2">{aluno.turma}</span>
                  {getTurmaLabel(aluno.turma)}
                </div>
              </div>
              
              <div className="row">
                <div className="col-sm-3">
                  <strong>Status:</strong>
                </div>
                <div className="col-sm-9">
                  <span className={`badge ${aluno.statusMatricula ? 'bg-success' : 'bg-danger'}`}>
                    {aluno.statusMatricula ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Ações</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link
                  to={`/alunos/${aluno.id}/editar`}
                  className="btn btn-warning"
                >
                  <i className="fas fa-edit me-2"></i>
                  Editar Aluno
                </Link>
                
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={excluirAluno}
                >
                  <i className="fas fa-trash me-2"></i>
                  Excluir Aluno
                </button>
                
                <hr />
                
                <Link to="/alunos" className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-2"></i>
                  Voltar para Lista
                </Link>
                
                <Link to="/alunos/novo" className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>
                  Novo Aluno
                </Link>
              </div>
            </div>
          </div>
          
          {/* Card de Informações Adicionais */}
          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Informações do Sistema</h5>
            </div>
            <div className="card-body">
              <small className="text-muted">
                <strong>ID:</strong> {aluno.id}<br />
                <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesAluno;