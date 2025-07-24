const express = require('express');
const router = express.Router();
const { Contenido, Tag } = require('../../models/trailerflix');
const { Op, fn, col, literal } = require('sequelize');

router.get('/peliculas/tags/aventura-fantasia', async (req, res) => {
  const tagsBuscados = ['Aventura', 'Fantasia'];
  try {
    const peliculas = await Contenido.findAll({
      where: { categoria_id: 1 },
      include: [{
        model: Tag,
        as: 'tags',
        attributes: [],
        where: { nombre: { [Op.in]: tagsBuscados } },
        through: { attributes: [] },
        required: true
      }],
      attributes: [
        'contenido_id',
        'titulo',
        [fn('COUNT', col('tags.tag_id')), 'coincidencias']
      ],
      group: ['Contenido.contenido_id', 'Contenido.titulo'],
      having: literal(`COUNT(tags.tag_id) = ${tagsBuscados.length}`)
    });

    res.json(peliculas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener películas por tags' });
  }
});

module.exports = router;
