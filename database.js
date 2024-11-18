//The require(‘mongoose’) call above returns a Singleton object.
//It means that the first time you call require(‘mongoose’), it
//is creating an instance of the Mongoose class and returning it.
//On subsequent calls, it will return the same instance that was
//created and returned to you the first time because of how module
//import/export works in ES6.
const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        console.log('DATABASE_MONGODB:', process.env.DATABASE_MONGODB); // Verifica si la URL de MongoDB está cargada
        mongoose.connect(process.env.DATABASE_MONGODB)
            .then(() => {
                console.log("database connection successful");
            })
            .catch((err) => {
                console.log("database connection error " + err);
            });

    }
}

module.exports = new Database();