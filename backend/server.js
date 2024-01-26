const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware para manejar CORS
app.use(cors());
app.use(express.json());

// Rutas
const databasePath = path.resolve(__dirname, '../database');

// Inicializar archivos de datos si no existen
const initializeDataFile = (fileName) => {
    const filePath = path.join(databasePath, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `module.exports = [];`);
    }
};
initializeDataFile('evaluacion');
initializeDataFile('preguntas');

// Cargar datos al inicio del servidor


let evaluacionData = require('../database/evaluacion');
let preguntasData = require('../database/preguntas');

app.get('/evaluacion', (req, res) => {
    try {
        res.json(evaluacionData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/preguntas', (req, res) => {
    try {
        res.json(preguntasData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/evaluacion', (req, res) => {
    try {
        const newEvaluacion = {
            idEvaluacion: evaluacionData.length + 1,
            nombreEvaluacion:req.body.nombreEvaluacion,
            idPregunta:req.body.idpregunta,
            
        };

        evaluacionData.push(newEvaluacion);
        fs.writeFileSync(path.join(databasePath, 'evaluacion.js'), `module.exports = ${JSON.stringify(evaluacionData, null, 2)};`);

        res.json(newEvaluacion);
    } catch (error) {
        console.error('Error en POST /adoptions:', error.message);
        res.status(500).json({ error: error.message });
    }
});
app.post('/preguntas', (req, res) => {
    try {
        const newPregunta = {
            idPregunta: preguntasData.length + 1,
            pregunta:req.body.pregunta,
        };

        preguntasData.push(newPregunta);
        fs.writeFileSync(path.join(databasePath, 'preguntas.js'), `module.exports = ${JSON.stringify(preguntasData, null, 2)};`);

        res.json(newPregunta);
    } catch (error) {
        console.error('Error en POST /preguntas:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});