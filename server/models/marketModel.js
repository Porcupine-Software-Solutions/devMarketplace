const { Pool } = require("pg");

const PG_URI =
  "postgres://rzoawfia:GqrDJD216Rw29xKb-oaXzfziVPmZug2K@drona.db.elephantsql.com:5432/rzoawfia";

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}`);
    return pool.query(text, params, callback);
  }
};
