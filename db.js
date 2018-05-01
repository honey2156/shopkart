const Sequelize = require('sequelize')

const db = new Sequelize('shopdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    },
    logging: false
})

const Vendor = db.define('vendors', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
    }
}, {
    timestamps: false
})

const Cart = db.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
})

// relationships
Vendor.hasMany(Product)
Product.belongsTo(Vendor)

Cart.belongsTo(User)
User.hasMany(Cart)

// Cart.hasMany(Product)
Cart.belongsTo(Product)
Product.hasMany(Cart)


db.sync()
    .then(() => {
        force: true
        console.log("database has been synced")
    })
    .catch((err) => {
        console.log("error syncing database " + err)
    })

module.exports = {
    Vendor,
    Product,
    User,
    Cart
}