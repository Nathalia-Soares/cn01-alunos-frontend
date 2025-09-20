import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CURSOS, TURMAS, STATUS_MATRICULA } from '../constants/formOptions';

const FormularioAluno = ({ aluno = null, onSubmit, isLoading = false }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: '',
    ra: '',
    curso: 'GE',
    turma: 1,
    statusMatricula: true
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (aluno) {
      setFormData({
        nome: aluno.nome || '',
        ra: aluno.ra || '',
        curso: aluno.curso || 'GE',
        turma: aluno.turma || 1,
        statusMatricula: aluno.statusMatricula !== undefined ? aluno.statusMatricula : true
      });
    }
  }, [aluno]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    let processedValue = value;
    
    if (type === 'radio') {
      processedValue = value === 'true';
    } else if (name === 'turma') {
      processedValue = parseInt(value, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }
    
    // Validar RA
    if (!formData.ra.trim()) {
      newErrors.ra = 'RA é obrigatório';
    } else if (formData.ra.trim().length < 3) {
      newErrors.ra = 'RA deve ter pelo menos 3 caracteres';
    }
    
    // Validar curso
    if (!formData.curso) {
      newErrors.curso = 'Curso é obrigatório';
    }
    
    // Validar turma
    if (!formData.turma || formData.turma < 1 || formData.turma > 6) {
      newErrors.turma = 'Turma deve estar entre 1 e 6';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Limpar dados antes de enviar
    const cleanData = {
      ...formData,
      nome: formData.nome.trim(),
      ra: formData.ra.trim(),
    };
    
    onSubmit(cleanData);
  };

  const handleCancel = () => {
    navigate('/alunos');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            {/* Nome */}
            <div className="col-md-6 mb-3">
              <label htmlFor="nome" className="form-label">
                Nome <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome completo do aluno"
                disabled={isLoading}
              />
              {errors.nome && (
                <div className="invalid-feedback">
                  {errors.nome}
                </div>
              )}
            </div>
            
            {/* RA */}
            <div className="col-md-6 mb-3">
              <label htmlFor="ra" className="form-label">
                RA <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.ra ? 'is-invalid' : ''}`}
                id="ra"
                name="ra"
                value={formData.ra}
                onChange={handleChange}
                placeholder="Digite o RA do aluno"
                disabled={isLoading}
              />
              {errors.ra && (
                <div className="invalid-feedback">
                  {errors.ra}
                </div>
              )}
            </div>
          </div>
          
          <div className="row">
            {/* Curso */}
            <div className="col-md-6 mb-3">
              <label htmlFor="curso" className="form-label">
                Curso <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.curso ? 'is-invalid' : ''}`}
                id="curso"
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                disabled={isLoading}
              >
                {CURSOS.map(curso => (
                  <option key={curso.value} value={curso.value}>
                    {curso.label}
                  </option>
                ))}
              </select>
              {errors.curso && (
                <div className="invalid-feedback">
                  {errors.curso}
                </div>
              )}
            </div>
            
            {/* Turma */}
            <div className="col-md-6 mb-3">
              <label htmlFor="turma" className="form-label">
                Turma <span className="text-danger">*</span>
              </label>
              <select
                className={`form-select ${errors.turma ? 'is-invalid' : ''}`}
                id="turma"
                name="turma"
                value={formData.turma}
                onChange={handleChange}
                disabled={isLoading}
              >
                {TURMAS.map(turma => (
                  <option key={turma.value} value={turma.value}>
                    {turma.label}
                  </option>
                ))}
              </select>
              {errors.turma && (
                <div className="invalid-feedback">
                  {errors.turma}
                </div>
              )}
            </div>
          </div>
          
          {/* Status da Matrícula */}
          <div className="mb-4">
            <label className="form-label">
              Status da Matrícula <span className="text-danger">*</span>
            </label>
            <div className="mt-2">
              {STATUS_MATRICULA.map(status => (
                <div key={status.value.toString()} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="statusMatricula"
                    id={`status-${status.value}`}
                    value={status.value}
                    checked={formData.statusMatricula === status.value}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <label className="form-check-label" htmlFor={`status-${status.value}`}>
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botões */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              {aluno ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormularioAluno;