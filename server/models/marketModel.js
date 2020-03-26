/**
 * @name marketModel.js
 * @description initializes database connection, including provision for testing 
 */
const { Pool } = require("pg");

const TEST_URI = 'postgres://gljrtwwt:a2uEBzjKYb63i1QPwEXEN-pfQEne-vSI@drona.db.elephantsql.com:5432/gljrtwwt';
const GEN_URI = "postgres://rzoawfia:GqrDJD216Rw29xKb-oaXzfziVPmZug2K@drona.db.elephantsql.com:5432/rzoawfia";
const PG_URI = process.env.NODE_ENV === 'test' ? TEST_URI : GEN_URI;

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}`);
    return pool.query(text, params, callback);
  }
};
