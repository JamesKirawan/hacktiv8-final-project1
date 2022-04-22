const { generateToken } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../helpers/bcrpyt");
const { db } = require("../config/db");
const moment = require("moment");
const uuidv4 = require("uuid");

exports.registerUser = async (req, res) => {
  const id = uuidv4.v4();
  const createdDate = moment(new Date());
  const modifiedDate = moment(new Date());
  const body = req.body;
  const email = body.email;
  const password = hashPassword(body.password);
  const queryText = `insert into users(id, email, password, created_date, modified_date) 
  values('${id}', '${email}', '${password}', '${createdDate.toISOString()}', '${modifiedDate.toISOString()}')
  returning *`;
  const validateQueryText = `select * from users where email = '${email}'`;
  try {
    const user = await db.query(validateQueryText);
    if (user.rows.length === 0) {
      const { rows } = await db.query(queryText);
      const token = generateToken({
        id: rows[0].id,
        email: rows[0].email,
      });
      return res.status(200).send({ token });
    } else {
      return res.status(400).send({
        message: `Email (${email}) Sudah Terdaftar`,
      });
    }
  } catch (e) {
    return res.status(503).send(e);
  }
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const queryText = `select * from users where email = '${email}'`;
  try {
    const { rows } = await db.query(queryText);
    if (rows.length !== 0) {
      if (comparePassword(password, rows[0].password)) {
        const token = generateToken({
          id: rows[0].id,
          email: rows[0].email,
        });
        return res.status(200).send({
          token,
        });
      } else {
        return res.status(400).send({
          message: "Password Tidak Sesuai",
        });
      }
    } else {
      return res.status(503).send({
        message: `Email (${email}) Tidak Terdaftar`,
      });
    }
  } catch (e) {
    return res.status(503).send(e);
  }
};
