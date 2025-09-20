import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="jumbotron p-5 rounded">
          <h1 className="display-4" style={{color: '#042D59'}}>Sistema de Gestão de Alunos</h1>
          <p className="lead" style={{color: '#00587C'}}>
            Bem-vindo ao sistema de gestão de alunos. Aqui você pode gerenciar 
            informações de estudantes de forma simples e eficiente.
          </p>
          <hr className="my-4" style={{borderColor: '#018A93'}} />
          <p style={{color: '#00587C'}}>
            Use os links abaixo para navegar pelas principais funcionalidades do sistema.
          </p>
          
          <div className="row mt-4">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-list fa-3x mb-3" style={{color: '#042D59'}}></i>
                  <h5 className="card-title" style={{color: '#042D59'}}>Lista de Alunos</h5>
                  <p className="card-text" style={{color: '#00587C'}}>
                    Visualize todos os alunos cadastrados no sistema.
                  </p>
                  <Link to="/alunos" className="btn btn-primary">
                    Ver Lista
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-user-plus fa-3x mb-3" style={{color: '#018A93'}}></i>
                  <h5 className="card-title" style={{color: '#042D59'}}>Novo Aluno</h5>
                  <p className="card-text" style={{color: '#00587C'}}>
                    Cadastre um novo aluno no sistema.
                  </p>
                  <Link to="/alunos/novo" className="btn btn-success">
                    Cadastrar
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-search fa-3x mb-3" style={{color: '#00587C'}}></i>
                  <h5 className="card-title" style={{color: '#042D59'}}>Buscar</h5>
                  <p className="card-text" style={{color: '#00587C'}}>
                    Encontre alunos específicos por ID ou RA.
                  </p>
                  <Link to="/alunos" className="btn btn-info">
                    Buscar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;