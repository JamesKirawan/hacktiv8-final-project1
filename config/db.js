const Pool = require("pg").Pool;
const config = require("./config")[process.env.NODE_ENV];

const db = new Pool(config);
// const db = new Pool({
//   user: "wozvolkgzgqoix",
//   host: "ec2-54-80-122-11.compute-1.amazonaws.com",
//   database: "desdib6tqi3mbf",
//   password: "3afd985384e105cffe7a290472aa1c6c97683cefacd6b0cfe0e44327d64fc37d",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//     requestCert: true,
//   },
// });

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
