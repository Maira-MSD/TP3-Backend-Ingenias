// routes/trailerflix/temporada.js
const express = require('express');
const router = express.Router();

const { Contenido } = require('../../models/trailerflix');
const { Op, where, literal } = require('sequelize');

// Series con al menos 3 temporadas
router.get('/series/min-3-temporadas', async (req, res) => {
  try {
    const series = await Contenido.findAll({
      attributes: ['contenido_id', 'titulo', 'temporadas'],
      where: {
        categoria_id: 2, // cambia si tu id para "series" es otro
        [Op.and]: [
          where(literal('CAST(COALESCE(temporadas, "0") AS UNSIGNED)'), { [Op.gte]: 3 })
        ]
      },
      order: [
        [literal('CAST(COALESCE(temporadas, "0") AS UNSIGNED)'), 'DESC'],
        ['titulo', 'ASC']
      ]
    });

    res.json(series);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar series con al menos 3 temporadas' });
  }
});

module.exports = router;
