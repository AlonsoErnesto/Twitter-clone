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
            secret: 'your-secret',  // Cambia esto por un secreto más seguro
            resave: false,
            saveUninitialized: false,
            store: new MongoStore({
                mongoUrl: process.env.DATABASE_MONGODB,  // Especificar la URL de la base de datos MongoDB
                ttl: 14 * 24 * 60 * 60  // Tiempo de vida de la sesión en segundos (14 días)
            }),
            cookie: { secure: process.env.NODE_ENV === 'production' }  // Usa cookies seguras en producción
        }));
    }
}

module.exports = new Database();
