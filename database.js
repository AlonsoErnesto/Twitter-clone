const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config({ path: '.env' });
const express = require('express');

class Database {

    constructor() {
        this.app = express(); // Crear instancia de Express
        this.connect(); // Conectar a la base de datos
        this.setupSession(); // Configurar las sesiones
    }

    // Conectar a MongoDB
    connect() {
        mongoose.connect(process.env.DATABASE_MONGODB, )
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.log("Database connection error: " + err);
            });
    }

    // Configurar las sesiones con MongoDB
    setupSession() {
        this.app.use(session({
            secret: process.env.SECRET_KEY,
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
                mongoUrl: process.env.DATABASE_MONGODB,
                ttl: 14 * 24 * 60 * 60
            }),
            cookie: { secure: process.env.NODE_ENV === 'production' }
        }));
    }
}

module.exports = new Database();
