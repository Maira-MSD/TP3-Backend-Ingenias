const express = require('express');
const router = express.Router();

const { Contenido, Categoria, Genero, Actores } = require('../../models/trailerflix');

// Lista películas con cada actor en una fila
router.get('/actores/peliculas', async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      where: { categoria_id: 1 }, // 1 = Películas ( se va ajustando si es otro valor)
      attributes: ['contenido_id', 'titulo'],
      include: [
        { model: Categoria, as: 'categoria', attributes: ['nombre'] }, 
        { model: Genero, as: 'genero', attributes: ['nombre'] },       
        {
          model: Actores,
          as: 'actores',                                               
          attributes: ['actores_id', 'nombre_completo'],
          through: { attributes: [] }
        }
      ],
      order: [
        [{ model: Actores, as: 'actores' }, 'nombre_completo', 'ASC'],
        ['titulo', 'ASC']
      ]
    });

    const result = contenidos.flatMap(c =>
      c.actores.map(a => ({
        actor: a.nombre_completo,
        titulo: c.titulo,
        categoria: c.categoria?.nombre,
        genero: c.genero?.nombre
      }))
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al listar actores con películas, categoría y género' });
  }
});

module.exports = router;
