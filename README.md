*Backend · Ingenias YPF 2025 · Entrega final*

**Equipo: 10** Integrantes*
    *Maira Belén Masdea*
    *Valeria *
    *Yesica Agata Finocchio*
    
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# TrailerFlix API

API REST construida con **Node.js + Express + Sequelize** sobre **MySQL**, que migra el catálogo del archivo `trailerflix.json` a un **modelo relacional normalizado (3FN)** y expone múltiples **endpoints de consulta y mantenimiento**.

Se implementaron todas las consignas solicitadas: diseño del modelo relacional (mín. 4 tablas), migración del JSON (Cartelera/Catálogo, Actores, Categorías, Géneros, Tags, Reparto), consultas SQL con `JOIN`, `GROUP BY`, `COUNT`, `HAVING`, `UNION`, etc., y endpoints equivalentes en Sequelize.

---

## Herramientas utilizadas

* **Node.js / Express**
* **Sequelize** (dialecto **mysql2**)
* **MySQL**
* tipos de clientes
* **dotenv**

---

## 📁 Estructura del proyecto

```
TP3-BACKEND-INGENIAS-MAIN/
├── src/
│   ├── models/
│   │   └── trailerflix.js         # Todos los modelos y asociaciones
│   ├── routes/
│   │   ├── index.js               # Enrutador principal
│   │   └── trailerflix/
│   │       ├── actores.js
│   │       ├── actores_cant.js
│   │       ├── buscar.js
│   │       ├── contarPelis.js
│   │       ├── contarSeries.js
│   │       ├── fecha_lanzamiento.js
│   │       ├── getAll.js
│   │       ├── getGenero.js
│   │       ├── getPeliculas.js
│   │       ├── getSeries.js
│   │       ├── ranking.js
│   │       ├── tags.js
│   │       └── temporada.js
│   ├── app.js
│   └── database.js
├── .env
├── package.json
└── README.md
```

---

## 🔐 Variables de entorno

Archivo `.env`:

```env
DB_NAME=trailerflix
DB_USER=root
DB_PASS=******
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000
```

---

## Modelo relacional (3FN)

Tablas principales:

* **contenido** (`contenido_id`, `titulo`, `resumen`, `temporadas`, `duracion`, `poster`, `trailer`, `categoria_id`, `genero_id`, `rank_id`)
* **categoria** (`categoria_id`, `nombre`)
* **genero** (`genero_id`, `nombre`)
* **actores** (`actores_id`, `nombre_completo`)
* **reparto** (`contenido_id`, `actores_id`) — relación **M\:N** entre contenido y actores
* **tag** (`tag_id`, `nombre`)
* **contenido\_tag** (`contenido_id`, `tag_id`) — relación **M\:N** entre contenido y tags
* **trabajos\_filmicos** (`id_trabajosf`, `contenido_id` (FK, ÚNICO), `fecha_lanzamiento`)
* **ranking** (`id_rank`, `calificacion`, `comentarios`)

### Normalización (3FN) – Resumen

* **1FN**: todos los atributos son atómicos (se desnormalizaron `reparto` y `tags` a tablas intermedias M\:N).
* **2FN**: no hay dependencias parciales porque todas las tablas con PK compuesta (`reparto`, `contenido_tag`) solo almacenan claves.
* **3FN**: no hay dependencias transitivas (por ejemplo, `genero.nombre` depende solo de `genero`, no de `contenido`).

---

## Migración desde `trailerflix.json`

1. **Parseo del JSON** (1er trabajo).
2. **Normalización** de entidades: Contenido, Categoría, Género, Actores, Tags, Reparto.
3. **Inserción** en MySQL respetando las FK y las tablas de cruce M\:N.
4. **Agregados posteriores**:

   * Tabla `trabajos_filmicos` + campo `fecha_lanzamiento`.
   * Tabla `ranking` + campo `rank_id` en `contenido`.

---

## El proyecto corre:

```bash
npm install
npm start   # o: node src/app.js
```

Servidor por defecto en: **[http://localhost:3000](http://localhost:3000)**

---

## Endpoints implementados

> Los paths reales dependen de cómo montaste los routers en `routes/index.js`. Aquí los dejamos tal como los usamos durante el desarrollo.

### Catálogo básico

| Método | Endpoint             | Descripción                                      |
| -----: | -------------------- | ------------------------------------------------ |
|    GET | `/trailerflix`       | Devuelve el catálogo completo (vista JSON-like). |
|    GET | `/contenido/:genero` | Películas/Series por género.                     |
|    GET | `/peliculas`         | Lista de películas.                              |
|    GET | `/series`            | Lista de series.                                 |
|    GET | `/chris-pratt-jobs`  | Cantidad de trabajos de Chris Pratt.             |
|    GET | `/peliculas/total`   | Total de películas.                              |
|    GET | `/series/total`      | Total de series.                                 |

### Tags

| Método | Endpoint                                 | Descripción                                                   |
| -----: | ---------------------------------------- | ------------------------------------------------------------- |
|    GET | `/peliculas/tags/aventura-fantasia`      | Películas que tienen **ambos** tags: “Aventura” y “Fantasia”. |
|    GET | `/peliculas/tags?tags=Aventura,Fantasia` | Versión **dinámica** (AND de todos los tags enviados).        |

### Series

| Método | Endpoint                        | Descripción                             |
| -----: | ------------------------------- | --------------------------------------- |
|    GET | `/series/min-3-temporadas`      | Series con **al menos 3 temporadas**.   |
|    GET | `/series/orden-temporadas-desc` | Series ordenadas por temporadas (DESC). |

### Actores

| Método | Endpoint                       | Descripción                                                             |
| -----: | ------------------------------ | ----------------------------------------------------------------------- |
|    GET | `/actores/peliculas`           | **Actor + título + categoría + género** (una fila por actor/contenido). |
|    GET | `/contenidos/extremos-actores` | Contenido con **más** y **menos** actores (devuelve ambos).             |

### Búsquedas

| Método | Endpoint                    | Descripción                                 |
| -----: | --------------------------- | ------------------------------------------- |
|    GET | `/peliculas/buscar?q=texto` | Busca en **título o resumen** de películas. |

### Trabajos fílmicos (fecha de lanzamiento)

| Método | Endpoint                      | Descripción                                                                                          |
| -----: | ----------------------------- | ---------------------------------------------------------------------------------------------------- |
|    PUT | `/aventura/fecha-lanzamiento` | Setea `fecha_lanzamiento` (DATE) a todo el género **“Aventura”**. Si no mandás fecha, usa la de hoy. |
|    GET | `/aventura/fecha-lanzamiento` | Lista los títulos “Aventura” con su `fecha_lanzamiento`.                                             |

### Ranking

| Método | Endpoint               | Descripción                                                                                    |
| -----: | ---------------------- | ---------------------------------------------------------------------------------------------- |
|    GET | `/ranking?categoria=1` | Calificación y comentarios (JOIN `contenido` ↔ `ranking`). Solo trae los que tienen `rank_id`. |

---

## Ejemplos de consultas SQL usadas

**Películas con ambos tags “Aventura” y “Fantasia”**:

```sql
SELECT 
  c.contenido_id,
  c.titulo,
  GROUP_CONCAT(DISTINCT t.nombre ORDER BY t.nombre) AS tags,
  COUNT(DISTINCT t.tag_id) AS coincidencias
FROM contenido AS c
JOIN contenido_tag AS ct ON ct.contenido_id = c.contenido_id
JOIN tag AS t ON t.tag_id = ct.tag_id
WHERE c.categoria_id = 1
  AND t.nombre IN ('Aventura', 'Fantasia')
GROUP BY c.contenido_id, c.titulo
HAVING COUNT(DISTINCT t.tag_id) = 2;
```

**Series con al menos 3 temporadas** (temporadas es VARCHAR):

```sql
SELECT contenido_id, titulo, temporadas
FROM contenido
WHERE categoria_id = 2
  AND CAST(COALESCE(temporadas, '0') AS UNSIGNED) >= 3
ORDER BY CAST(COALESCE(temporadas, '0') AS UNSIGNED) DESC;
```

**Contenido con más y menos actores**:

```sql
SELECT 
  c.contenido_id, c.titulo, cat.nombre AS categoria,
  COUNT(r.actores_id) AS cantidadActores
FROM contenido c
LEFT JOIN reparto r ON r.contenido_id = c.contenido_id
JOIN categoria cat ON cat.categoria_id = c.categoria_id
GROUP BY c.contenido_id, c.titulo, cat.nombre;
-- Luego se toma el MAX() y MIN() en la app
```

**Actualizar fecha\_lanzamiento (Aventura) con la fecha actual**:

```sql
INSERT INTO trabajos_filmicos (contenido_id, fecha_lanzamiento)
SELECT c.contenido_id, CURDATE()
FROM contenido c
JOIN genero g ON g.genero_id = c.genero_id
WHERE g.nombre = 'Aventura'
ON DUPLICATE KEY UPDATE fecha_lanzamiento = VALUES(fecha_lanzamiento);
```

**Ranking (JOIN)**:

```sql
SELECT a.calificacion, a.comentarios, a.id_rank, b.rank_id, b.titulo
FROM ranking AS a
JOIN contenido AS b ON a.id_rank = b.rank_id;
```

---

## Aprendizajes aplicados y que internalizamos

* **Sequelize**: definición de modelos, asociaciones (`belongsTo`, `hasMany`, `belongsToMany`, `hasOne`), `include`, `group`, `having`, `fn`, `col`, `literal`, `Op`.
* **Abstracción de SQL**: reemplazamos consultas SQL crudas por endpoints Sequelize equivalentes.
* **Normalización (3FN)**: separación de entidades (`tag`, `actores`, relaciones M\:N, etc.).
* **Buenas prácticas**:

  * Variables de entorno en `.env`.
  * Aliases (`as`) consistentes para evitar `SequelizeEagerLoadingError`.
  * Manejo de errores con `try/catch`.
  * Endpoints asincrónicos.

---

## Licencia

Proyecto educativo YPF Ingenias. Uso libre con atribución.
