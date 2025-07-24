// routes/trailerflix/series_orden.js
const express = require('express');
const router = express.Router();

const { Contenido } = require('../../models/trailerflix');
const { literal } = require('sequelize');

// Series en orden DESC por cantidad de temporadas
router.get('/series/orden-temporadas-desc', async (req, res) => {
  try {
    const series = await Contenido.findAll({
      attributes: ['contenido_id', 'titulo', 'temporadas'],
      where: { categoria_id: 2 }, // 2 = series (ajustá si es otro valor)
      order: [
        [literal('CAST(COALESCE(temporadas, "0") AS UNSIGNED)'), 'DESC'],
        ['titulo', 'ASC']
      ]
    });

    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar series ordenadas por temporadas' });
  }
});

module.exports = router;
