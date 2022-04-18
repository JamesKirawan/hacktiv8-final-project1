const { User } = require("../models");
const { generateToken } = require("../middlewares/auth");
const { hashPassword, comparePassword } = require("../helpers/bcrpyt");

exports.registerUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (user) {
      return res.status(400).send({
        message: "Email already exists",
      });
    } else {
      return User.create({
        email: email,
        password: hashPassword(password),
      })
        .then((user) => {
          const token = generateToken({
            email: user.email,
            id: user.id,
          });
          res.status(200).send({
            // status: "SUCCESS",
            // message: "User Berhasil Register",
            // data: user,
            token: token,
          });
        })
        .catch((e) => {
          res.status(503).send({
            status: "FAIL",
            message: "User Gagal Registrasi",
          });
        });
    }
  });
};

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          name: "User Login Error",
          message: `User's with email ${email} not found`,
        });
      }
      const isCorrect = comparePassword(password, user.password);

      if (!isCorrect) {
        return res.status(400).json({
          name: "User Login Error",
          message: `User's password with email "${email}" doesn't match`,
        });
      }
      let payload = {
        id: user.id,
        email: user.email,
      };
      const token = generateToken(payload);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};
