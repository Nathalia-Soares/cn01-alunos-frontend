import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ListaAlunos from './pages/ListaAlunos';
import NovoAluno from './pages/NovoAluno';
import EditarAluno from './pages/EditarAluno';
import DetalhesAluno from './pages/DetalhesAluno';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<ListaAlunos />} />
          <Route path="/alunos/novo" element={<NovoAluno />} />
          <Route path="/alunos/:id/editar" element={<EditarAluno />} />
          <Route path="/alunos/:id" element={<DetalhesAluno />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;