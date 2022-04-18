const { Reflection } = require("../models");

exports.postReflection = async (req, res) => {
  const body = req.body;
  const success = body.success;
  const low_point = body.low_point;
  const take_away = body.take_away;
  const user_id = req.user_id;

  return Reflection.create({
    success: success,
    low_point: low_point,
    take_away: take_away,
    user_id: user_id,
  })
    .then((reflection) => {
      res.status(201).send({
        data: reflection,
      });
    })
    .catch((e) => {
      res.status(503).send({
        status: "FAIL",
        message: "Gagal membuat refleksi",
      });
    });
};
