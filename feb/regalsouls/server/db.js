const  POOL  = require('pg').Pool;

const pool = new POOL({
    host:"localhost",
    port:5432,
    password:"8896",
    database:"gsite",
    user:"playabook"
});



module.exports = pool;