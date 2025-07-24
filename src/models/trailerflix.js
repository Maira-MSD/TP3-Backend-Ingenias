//definir tipo de dato
const {DataTypes} = require("sequelize");
const sequelize = require("../database");

//registro de tabla ranking

const Ranking = sequelize.define('Ranking', {
  id_rank: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentarios: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'ranking',
  timestamps: false
});

//registro de tabla trabajos_filmicos
const TrabajosFilmicos = sequelize.define('TrabajosFilmicos', {
  id_trabajosf: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  contenido_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_lanzamiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'trabajos_filmicos',
  timestamps: false
});


//registro de tabla Categoria

const Categoria = sequelize.define("Categoria", {
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "Categoria",
    timestamps: false
});

//registro de tabla Genero

const Genero = sequelize.define("Genero", {
    genero_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "Genero",
    timestamps: false
});

//registro de tabla Actores
const Actores = sequelize.define('Actores', {
    actores_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'actores',
    timestamps: false
});

// ASOCIACION con contenido a través de reparto
Actores.associate = models => {
    Actores.belongsToMany(models.Contenido, {
        through: models.Reparto,
        foreignKey: 'actores_id',
        otherKey: 'contenido_id'
    });
};

//registro de tabla Tag
const Tag = sequelize.define('Tag', {
    tag_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'tag',
    timestamps: false
});

// Asociación con contenido a través de Contenido_Tag
// Tag.associate = models => {
 //    Tag.belongsToMany(models.Contenido, {
 //        through: models.Contenido_Tag,
 //        foreignKey: 'tag_id',
  //       otherKey: 'contenido_id'
  //   });
// };

//registro de tabla Reparto
const Reparto = sequelize.define('Reparto', {
    contenido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    actores_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: 'reparto',
    timestamps: false
});

//registro de tabla Contenido_Tag
const Contenido_Tag = sequelize.define('Contenido_Tag', {
    contenido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
}, {
    tableName: 'contenido_tag',
    timestamps: false
});

//registro de tabla Contenido
const Contenido = sequelize.define("Contenido", {
    contenido_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    resumen:{
        type: DataTypes.STRING(1000),
        allowNull: true,
            },
    temporadas:{
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    duracion:{
        type:  DataTypes.STRING(50),
        allowNull: true,
    },
    poster:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    trailer:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    categoria_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Categoria",
            key: "categoria_id"
        },
    },
    genero_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Genero",
            key: "genero_id"
        },

},
//registro de RANKING
  rank_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'ranking',
      key: 'id_rank'
    }

    }
},
{
    tableName: "Contenido",
    timestamps:false,
}
);
 
// --- ASOCIACIONES ---

// Contenido ↔ Ranking
Contenido.belongsTo(Ranking, { foreignKey: 'rank_id', as: 'ranking' });
Ranking.hasMany(Contenido,   { foreignKey: 'rank_id', as: 'contenidos' });

// Contenido ↔ Categoria
Contenido.belongsTo(Categoria, { foreignKey: "categoria_id", as: 'categoria' });
Categoria.hasMany(Contenido,   { foreignKey: "categoria_id", as: 'contenidos' });

// Contenido ↔ Genero
Contenido.belongsTo(Genero, { foreignKey: "genero_id", as: 'genero' });
Genero.hasMany(Contenido,   { foreignKey: "genero_id", as: 'contenidos' });

// Contenido ↔ Tag (M:N)
Contenido.belongsToMany(Tag, {
  through: Contenido_Tag,
  foreignKey: 'contenido_id',
  otherKey: 'tag_id',
  as: 'tags'
});
Tag.belongsToMany(Contenido, {
  through: Contenido_Tag,
  foreignKey: 'tag_id',
  otherKey: 'contenido_id',
  as: 'contenidos'
});

// Contenido ↔ Actores (M:N)
Contenido.belongsToMany(Actores, {
  through: Reparto,
  foreignKey: 'contenido_id',
  otherKey: 'actores_id',
  as: 'actores'
});
Actores.belongsToMany(Contenido, {
  through: Reparto,
  foreignKey: 'actores_id',
  otherKey: 'contenido_id',
  as: 'contenidos'
});

// Contenido ↔ TrabajosFilmicos (1:1)
Contenido.hasOne(TrabajosFilmicos, {
  foreignKey: 'contenido_id',
  as: 'trabajoFilmico'
});
TrabajosFilmicos.belongsTo(Contenido, {
  foreignKey: 'contenido_id',
  as: 'contenidoAsociado'
});


//exportar los modelos de tabla de contenido, categoria, genero
module.exports = {
  sequelize,
  Contenido, Categoria, Genero, Actores, Tag, Reparto, Contenido_Tag,
  TrabajosFilmicos, Ranking
};

