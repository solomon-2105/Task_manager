const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',  // ✅ Must match the name shown in \c
  password: 'Solomon@2105',
  port: 5432,
});

module.exports = pool;
