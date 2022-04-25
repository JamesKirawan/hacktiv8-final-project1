const Pool = require("pg").Pool;
const { Client } = require("pg");

const db = new Client({
  user: "gpxvmnewmaefnd",
  host: "ec2-34-207-12-160.compute-1.amazonaws.com",
  database: "d550lquh841sq1",
  password: "55cfe45dee7ac6eb51305138ace1bcba6ede7b5d8b8a8a9049684e32b809a082",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    requestCert: true,
  },
});

// const db = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "FinalProject1",
//   password: "",
//   port: "4000",
// });

/**
 * Create User Table
 */
const createUserTable = async () => {
  const queryText = `CREATE TABLE
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  await db
    .query(queryText)
    .then((res) => {
      console.log(res);
      // db.end();
    })
    .catch((err) => {
      console.log(err);
      // db.end();
    });
};

/**
 * Create Reflection Table
 */
const createReflectionTable = async () => {
  const queryText = `CREATE TABLE
      reflections(
        id UUID PRIMARY KEY,
        success TEXT NOT NULL,
        low_point TEXT NOT NULL,
        take_away TEXT NOT NULL,
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  await db
    .query(queryText)
    .then((res) => {
      console.log(res);
      // db.end();
    })
    .catch((err) => {
      console.log(err);
      // db.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = async () => {
  await createUserTable();
  await createReflectionTable();
};

module.exports = {
  db,
  createReflectionTable,
  createUserTable,
  createAllTables,
};
