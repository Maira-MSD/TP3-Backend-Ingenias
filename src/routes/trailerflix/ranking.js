
// ranking

const express = require('express');
const router = express.Router();

const { Contenido, Ranking } = require('../../models/trailerflix');
const { Op } = require('sequelize');

// Devuelve: calificacion, comentarios, id_rank, rank_id, titulo
router.get('/ranking', async (req, res) => {
  try {
    const { categoria } = req.query;

    const where = {
      rank_id: { [Op.ne]: null }   // solo los que tienen ranking asignado, antes me traia todo
    };
    if (categoria) where.categoria_id = Number(categoria);

    const rows = await Contenido.findAll({
      where,
      attributes: ['titulo', 'rank_id'],
      include: [{
        model: Ranking,
        as: 'ranking',
        attributes: ['id_rank', 'calificacion', 'comentarios'],
        required: true 
      }],
      order: [[{ model: Ranking, as: 'ranking' }, 'calificacion', 'DESC']]
    });

    const out = rows.map(r => ({
      calificacion: r.ranking.calificacion,
      comentarios: r.ranking.comentarios,
      id_rank: r.ranking.id_rank,
      rank_id: r.rank_id,
      titulo: r.titulo
    }));

    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al listar ranking' });
  }
});

module.exports = router;
