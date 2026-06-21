const mysql = require('mysql2');
const  params = require("./gen_params");
let HOST     =params.HOST     ;
let USER     =params.USER     ;
let PASSWORD =params.PASSWORD ;
let DATABASE =params.DATABASE ;

let pool = mysql.createPool({
    host:       HOST,
    user:       USER,
    password:   PASSWORD,
    database:   DATABASE,
    waitForConnections: true,
    connectionLimit: 50,
    maxIdle: 25,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
if(pool !== undefined){
    console.log("my sql pool created")
};
module.exports = { pool:pool };
