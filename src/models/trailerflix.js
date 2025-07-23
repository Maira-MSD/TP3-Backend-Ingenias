//definir tipo de dato
const {DataTypes} = require("sequelize");
const sequelize = require("../database");

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
    }
},
{
    tableName: "Contenido",
    timestamps:false,
}
);
 
Contenido.belongsTo(Categoria, {
    foreignKey: "categoria_id"
});
Categoria.hasMany(Contenido, {
    foreignKey: "categoria_id"
});

Contenido.belongsTo(Genero, {
    foreignKey: "genero_id"
});
Genero.hasMany(Contenido, {
    foreignKey: "genero_id"
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

// Asociación con contenido a través de reparto
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
    tableName: 'tags',
    timestamps: false
});

// Asociación con contenido a través de Contenido_Tag
Tag.associate = models => {
    Tag.belongsToMany(models.Contenido, {
        through: models.Contenido_Tag,
        foreignKey: 'tag_id',
        otherKey: 'contenido_id'
    });
};

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
  
//exportar los modelos de tabla de contenido, categoria, genero
module.exports = { Contenido, Categoria, Genero, Actores, Tag, Reparto, Contenido_Tag };

