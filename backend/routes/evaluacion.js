const express = require('express');
const router = express.Router();
const db = require('../../database/evaluacion');


// Obtener la lista de adopciones
router.get('/', (req, res) => {
    res.json(db);
});

module.exports = router;
