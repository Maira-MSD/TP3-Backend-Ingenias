// BUSCAR PELICULAS POR PALABRAS CLAVES
const express = require('express');
const router = express.Router();

const { Contenido } = require('../../models/trailerflix');
const { Op } = require('sequelize');

/**
 * Buscar **películas** por palabra clave en título o resumen.
 * Ej:  GET /peliculas/buscar?q=Madre, PUEDE CAMBIARSE A OTRA PALABRA
 */
router.get('/peliculas/buscar', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.status(400).json({ error: 'Debes enviar el parámetro ?q=palabra' });
    }

    const peliculas = await Contenido.findAll({
      where: {
        categoria_id: 1, // SE VA AJUSTANDO DEPENDIENDO EL ID
        [Op.or]: [
          { titulo:   { [Op.like]: `%${q}%` } },
          { resumen:  { [Op.like]: `%${q}%` } }
        ]
      },
      attributes: ['contenido_id', 'titulo', 'resumen', 'poster', 'trailer'],
      order: [['titulo', 'ASC']],
      limit: 50
    });

    res.json({ q, total: peliculas.length, resultados: peliculas });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al buscar películas' });
  }
});

module.exports = router;
