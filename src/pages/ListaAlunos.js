import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alunosService } from '../services/alunosService';
import { CURSOS, TURMAS } from '../constants/formOptions';

const ListaAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('nome'); // nome, ra, curso

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alunosService.listarTodos();
      setAlunos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const excluirAluno = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${nome}?`)) {
      try {
        await alunosService.excluir(id);
        setAlunos(alunos.filter(aluno => aluno.id !== id));
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

  const alunosFiltrados = alunos.filter(aluno => {
    if (!filtro) return true;
    
    switch (tipoFiltro) {
      case 'nome':
        return aluno.nome.toLowerCase().includes(filtro.toLowerCase());
      case 'ra':
        return aluno.ra.toLowerCase().includes(filtro.toLowerCase());
      case 'curso':
        return aluno.curso.toLowerCase().includes(filtro.toLowerCase());
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando alunos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Erro!</h4>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={carregarAlunos}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Alunos</h1>
        <Link to="/alunos/novo" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Novo Aluno
        </Link>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="tipoFiltro" className="form-label">Filtrar por:</label>
              <select
                id="tipoFiltro"
                className="form-select"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
              >
                <option value="nome">Nome</option>
                <option value="ra">RA</option>
                <option value="curso">Curso</option>
              </select>
            </div>
            <div className="col-md-8">
              <label htmlFor="filtro" className="form-label">Buscar:</label>
              <input
                type="text"
                id="filtro"
                className="form-control"
                placeholder={`Digite o ${tipoFiltro} para filtrar...`}
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Alunos */}
      {alunosFiltrados.length === 0 ? (
        <div className="alert alert-info text-center">
          <h4>Nenhum aluno encontrado</h4>
          <p>
            {filtro 
              ? 'Nenhum aluno corresponde aos critérios de busca.'
              : 'Não há alunos cadastrados no sistema.'
            }
          </p>
          {!filtro && (
            <Link to="/alunos/novo" className="btn btn-primary">
              Cadastrar Primeiro Aluno
            </Link>
          )}
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>RA</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Turma</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunosFiltrados.map(aluno => (
                    <tr key={aluno.id}>
                      <td>{aluno.ra}</td>
                      <td>{aluno.nome}</td>
                      <td>{getCursoLabel(aluno.curso)}</td>
                      <td>{getTurmaLabel(aluno.turma)}</td>
                      <td>
                        <span className={`badge ${aluno.statusMatricula ? 'bg-success' : 'bg-danger'}`}>
                          {aluno.statusMatricula ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/alunos/${aluno.id}`}
                            className="btn btn-info btn-sm btn-action"
                            title="Ver Detalhes"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            to={`/alunos/${aluno.id}/editar`}
                            className="btn btn-warning btn-sm btn-action"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            title="Excluir"
                            onClick={() => excluirAluno(aluno.id, aluno.nome)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Informações de Totais */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <h5 className="text-primary">{alunos.length}</h5>
                  <small className="stats-label">Total de Alunos</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-success">
                    {alunos.filter(a => a.statusMatricula).length}
                  </h5>
                  <small className="stats-label">Ativos</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-danger">
                    {alunos.filter(a => !a.statusMatricula).length}
                  </h5>
                  <small className="stats-label">Inativos</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-info">{alunosFiltrados.length}</h5>
                  <small className="stats-label">Filtrados</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAlunos;