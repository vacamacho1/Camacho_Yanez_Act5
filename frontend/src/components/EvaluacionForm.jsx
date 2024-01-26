import React, { useState, useEffect } from 'react';
import PreguntaForm from './PreguntaForm';
import PropTypes from 'prop-types';

const EvaluacionForm = ({ onGuardarEvaluacion }) => {
  const [preguntas, setPreguntas] = useState([]);
  const [evaluacion, setEvaluacion] = useState({ nombre: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preResponse = await fetch('http://localhost:3001/preguntas');
        const preData = await preResponse.json();
        setPreguntas(preData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const agregarPregunta = async (nombrePregunta) => {
    try {
      const response = await fetch('http://localhost:3001/preguntas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pregunta: nombrePregunta,
        }),
      });

      if (response.ok) {
        const newPre = await response.json();
        setPreguntas([...preguntas, newPre]);
      } else {
        throw new Error('Error al enviar la solicitud de pregunta.');
      }
    } catch (error) {
      console.error('Error en la solicitud de pregunta:', error.message);
      throw error;
    }
  };

  const handleGuardar = () => {
    if (evaluacion.nombre.trim() !== '') {
      onGuardarEvaluacion(evaluacion);
      setEvaluacion({ nombre: '' });
    }
  };

  const handleInputChange = (e) => {
    setEvaluacion({ ...evaluacion, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Nueva Evaluación</h2>
      <form>
        <label>
          Nombre de la Evaluación:
          <input
            type="text"
            name="nombre"
            value={evaluacion.nombre}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <hr />
        <h3>Preguntas</h3>
        {preguntas.map((pregunta, index) => (
          <div key={index}>{pregunta.pregunta}</div>
        ))}
        <PreguntaForm onAgregarPregunta={agregarPregunta} />
        <button type="button" onClick={handleGuardar}>
          Guardar Evaluación
        </button>
      </form>
    </div>
  );
};

EvaluacionForm.propTypes = {
  onGuardarEvaluacion: PropTypes.func.isRequired,
};

export default EvaluacionForm;



