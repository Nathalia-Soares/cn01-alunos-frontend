import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Sistema de Alunos
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/alunos">Lista de Alunos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/alunos/novo">Novo Aluno</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <span className="text-muted">
            © 2023 Sistema de Gestão de Alunos. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;