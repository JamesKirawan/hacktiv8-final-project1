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
  const validateUser = await db.query(validateQueryText);
  if (validateUser.rows.length === 0) {
    await db
      .query(queryText)
      .then((user) => {
        const token = generateToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({
          token,
        });
      })
      .catch((e) => {
        res.status(503).send(e.message);
      });
  } else {
    res.status(400).send({
      message: `Email (${email}) Sudah Tedaftar`,
    });
  }
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const queryText = `select * from users where email = '${email}'`;
  const validateEmail = await db.query(queryText);
  if (validateEmail.rows.length !== 0) {
    if (comparePassword(password, validateEmail.rows[0].password)) {
      const token = generateToken({
        id: validateEmail.rows[0].id,
        email: validateEmail.rows[0].email,
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
    res.status(503).send({
      message: `Email (${email}) Tidak Terdaftar`,
    });
  }
};
