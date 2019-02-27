const util = require('util')
const mysql = require('mysql')
const db = require('./config/db')

const pool = mysql.createPool({
  connectionLimit: 10,
  host : db.host,
  user : db.user,
  password : db.password,
  database : db.database,
  port : db.port,
})

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

// Promisify for Node.js async/await
pool.query = util.promisify(pool.query)

module.exports = pool
