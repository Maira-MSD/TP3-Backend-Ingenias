// FECHA DE LANZAMIENTO CATEGORIA AVENTURA

const express = require('express');
const router = express.Router();

const { Contenido, Genero, TrabajosFilmicos } = require('../../models/trailerflix');


// Pone la misma fecha (o la de hoy si no mandás ninguna) a todos los títulos del género "Aventura"
router.put('/aventura/fecha-lanzamiento', async (req, res) => {
  try {
    const fecha = (req.body.fecha || new Date().toISOString().slice(0, 10)); // YYYY-MM-DD 

    const genero = await Genero.findOne({ where: { nombre: 'Aventura' } });
    if (!genero) return res.status(404).json({ error: 'No existe el género "Aventura"' });

    const contenidos = await Contenido.findAll({
      where: { genero_id: genero.genero_id },
      attributes: ['contenido_id', 'titulo']
    });

    if (!contenidos.length) {
      return res.json({ updated: 0, fecha_aplicada: fecha, mensaje: 'No hay contenidos del género Aventura' });
    }

    let ok = 0, fail = 0;
    for (const c of contenidos) {
      try {
        // upsert = inserta si no existe, actualiza si existe para que cumpla su funcion
        await TrabajosFilmicos.upsert({
          contenido_id: c.contenido_id,
          fecha_lanzamiento: fecha
        });
        ok++;
      } catch (e) {
        fail++;
      }
    }

    res.json({ updated: ok, failed: fail, fecha_aplicada: fecha });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar las fechas de lanzamiento' });
  }
});

// acà empieza la accion del GET /aventura/fecha-lanzamiento
// Para ver lo que quedó grabado
router.get('/aventura/fecha-lanzamiento', async (req, res) => {
  try {
    const genero = await Genero.findOne({ where: { nombre: 'Aventura' } });
    if (!genero) return res.status(404).json({ error: 'No existe el género "Aventura"' });

    const rows = await Contenido.findAll({
      where: { genero_id: genero.genero_id },
      attributes: ['contenido_id', 'titulo'],
      include: [{
        model: TrabajosFilmicos,
        as: 'trabajoFilmico',
        attributes: ['fecha_lanzamiento']
      }]
    });

    res.json(rows.map(r => ({
      contenido_id: r.contenido_id,
      titulo: r.titulo,
      fecha_lanzamiento: r.trabajoFilmico?.fecha_lanzamiento ?? null
    })));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al listar fechas de lanzamiento' });
  }
});

module.exports = router;
