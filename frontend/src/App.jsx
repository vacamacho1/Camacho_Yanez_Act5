import { useState, useEffect } from 'react';
import EvaluacionForm from './components/EvaluacionForm';

const App = () => {
  const [evaluacion, setEvaluacion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evaluacionResponse = await fetch('http://localhost:3001/evaluacion');
        const evaluacionData = await evaluacionResponse.json();
        setEvaluacion(evaluacionData);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
      }
    };

    fetchData();
  }, []);

  const evaluacionSubmit = async (n) => {
    try {
      const response = await fetch('http://localhost:3001/evaluacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreEvaluacion: n,
        }),
      });

      if (response.ok) {
        const newEvaluacion = await response.json();
        setEvaluacion(newEvaluacion);
      } else {
        throw new Error('Error al enviar la solicitud de evaluación.');
      }
    } catch (error) {
      console.error('Error en la solicitud de evaluación:', error.message);
      throw error;
    }
  };

  return (
    <div className="App">
      <h1>Nueva Evaluación</h1>
      <EvaluacionForm onGuardarEvaluacion={evaluacionSubmit} />
    </div>
  );
};

export default App;

