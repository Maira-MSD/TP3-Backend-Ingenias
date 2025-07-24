const express = require('express');
const router = express.Router();

const { Contenido, Actores, Categoria } = require('../../models/trailerflix');
const { fn, col } = require('sequelize');

router.get('/contenidos/extremos-actores', async (req, res) => {
  try {
    const rows = await Contenido.findAll({
      attributes: [
        'contenido_id',
        'titulo',
        [fn('COUNT', col('actores.actores_id')), 'cantidadActores'],
        [col('categoria.nombre'), 'categoria']   // usamos el alias 'categoria'
      ],
      include: [
        {
          model: Actores,
          as: 'actores',
          attributes: [],
          through: { attributes: [] },
          required: false
        },
        {
          model: Categoria,
          as: 'categoria',
          attributes: [] // ya la traemos como col('categoria.nombre')
        }
      ],
      group: ['Contenido.contenido_id', 'Contenido.titulo', 'categoria.nombre'],
      raw: true
    });

    if (!rows.length) return res.json({ masActores: null, menosActores: null });

    const max = Math.max(...rows.map(r => Number(r.cantidadActores)));
    const min = Math.min(...rows.map(r => Number(r.cantidadActores)));

    // devuelve un paquete (si hay varios con el mismo max/min)
    const masActores = rows.filter(r => Number(r.cantidadActores) === max);
    const menosActores = rows.filter(r => Number(r.cantidadActores) === min);

    res.json({ masActores, menosActores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al calcular extremos por cantidad de actores' });
  }
});

module.exports = router;
