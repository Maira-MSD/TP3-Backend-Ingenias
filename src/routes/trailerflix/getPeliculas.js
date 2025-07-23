const express = require("express");
const router = express.Router();
const { Contenido, Tag, Genero } = require("../../models/trailerflix");

router.get("/", async (req, res) => {
  try {
    const peliculas = await Contenido.findAll({
      attributes: ["titulo", "duracion", "trailer"],
      include: [
        {
          model: Genero,
          attributes: ['nombre']
        },
        {
          model: Tag,
          attributes: ['nombre'],
          through: { attributes: [] }
        }
      ],
      where: { categoria_id: 1 },
    });
    //console.log(peliculas);

    //Formatear resultados
    const peliculasFormateadas = peliculas.map(p => {
        return {
        titulo: p.titulo.toUpperCase(),
        genero: p.Genero.nombre.toUpperCase(),
        tags: p.Tags.map(t => t.nombre).join(', '),
        duracion: p.duracion,
        trailer: p.trailer
      };
    });
    res.json(peliculasFormateadas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener películas" });
  }
});

module.exports = router;