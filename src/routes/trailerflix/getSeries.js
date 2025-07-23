const express = require("express");
const router = express.Router();
const { Contenido, Tag, Genero } = require("../../models/trailerflix");

router.get("/", async (req, res) => {
  try {
    const series = await Contenido.findAll({
      attributes: ["titulo", "temporadas", "trailer", "resumen"],
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
      where: { categoria_id: 2 },
    });
    //console.log(series);

    //Formatear resultados
    const seriesFormateadas = series.map(s => {
        return {
        titulo: s.titulo.toUpperCase(),
        genero: s.Genero.nombre.toUpperCase(),
        tags: s.Tags.map(t => t.nombre).join(', '),
        temporadas: s.temporadas,
        trailer: s.trailer,
        resumen: s.resumen
      };
    });
    res.json(seriesFormateadas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener series" });
  }
});

module.exports = router;