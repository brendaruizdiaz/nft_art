const { contextsKey } = require('express-validator/src/base');
const { promisify } = require('util');

const mysql = require('mysql');

const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONEECTION_LOST') {
            console.error('CONEXION CON BASE DE DATOS CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE TIENE MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('LA CONEXION FUE RECHAZADA');
        }
    }

    if (connection) connection.release();
    console.log('BASE DE DATOS CONECTADA');
    return;
});

//Promisisy Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;