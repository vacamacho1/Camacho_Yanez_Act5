import React, { useState } from 'react';

const PreguntaForm = ({ onAgregarPregunta }) => {
  const [pregunta, setPregunta] = useState('');

  const handleInputChange = (e) => {
    setPregunta(e.target.value);
  };

  const handleAgregarPregunta = () => {
    if (pregunta.trim() !== '') {
      onAgregarPregunta(pregunta);
      setPregunta('');
    }
  };

  return (
    <div>
      <label>
        Nueva Pregunta:
        <input type="text" value={pregunta} onChange={handleInputChange} />
      </label>
      <button type="button" onClick={handleAgregarPregunta}>
        Agregar Pregunta
      </button>
    </div>
  );
};

export default PreguntaForm;

