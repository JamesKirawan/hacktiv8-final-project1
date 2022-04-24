const { db } = require("../config/db");
const moment = require("moment");
const uuidv4 = require("uuid");

exports.postReflection = async (req, res) => {
  const id = uuidv4.v4();
  const createdDate = moment(new Date());
  const modifiedDate = moment(new Date());
  const body = req.body;
  const success = body.success;
  const low_point = body.low_point;
  const take_away = body.take_away;
  const user_id = req.user_id;
  const queryText = `insert into reflections(id, success, low_point, take_away, owner_id, created_date, modified_date)
  values('${id}', '${success}', '${low_point}', '${take_away}', '${user_id}', '${createdDate.toISOString()}', '${modifiedDate.toISOString()}') returning *`;
  await db
    .query(queryText)
    .then((reflection) => {
      res.status(200).send({
        data: reflection.rows,
      });
    })
    .catch((e) => {
      res.status(503).send(e);
    });
};

exports.getReflection = async (req, res) => {
  const user_id = req.user_id;
  await db
    .query("select * from reflections where owner_id = $1", [user_id])
    .then((result) => {
      res.status(200).json({
        data: result.rows,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "INTERNAL SERVER ERROR",
      });
    });
};

exports.deleteReflection = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user_id;
  const validateQueryText = `select * from reflections where id = '${id}'`;
  const validateReflection = await db.query(validateQueryText);
  if (validateReflection.rows.length === 0) {
    res.status(503).send({
      message: "Reflection not found",
    });
  } else {
    if (validateReflection.rows[0].owner_id === user_id) {
      await db
        .query("delete from reflections where id = $1", [id])
        .then((result) => {
          res.status(200).json({
            message: "Sukses",
          });
        })
        .catch((e) => {
          res.status(404).send({
            message: "Gagal menghapus data",
          });
        });
    } else {
      res.status(401).json({
        message: "Anda Tidak Memiliki Hak Untuk Menghapus Reflection Ini",
      });
    }
  }
};

exports.updateReflection = async (req, res) => {
  const id = req.params.id;
  const user_id = req.user_id;
  let success = req.body.success;
  let low_point = req.body.low_point;
  let take_away = req.body.take_away;
  const validateQueryText = `select * from reflections where id = '${id}'`;
  const validateReflection = await db.query(validateQueryText);
  if (validateReflection.rows.length === 0) {
    res.status(503).json({
      message: "Reflection not found",
    });
  } else {
    if (validateReflection.rows[0].owner_id === user_id) {
      await db
        .query(
          "UPDATE reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4 and owner_id = $5 returning *",
          [success, low_point, take_away, id, user_id]
        )
        .then((result) => {
          res.status(200).json({
            data: result.rows,
          });
        })
        .catch((e) => {
          res.status(404).json({
            message: "Gagal melakukan update",
          });
        });
    } else {
      res.status(401).json({
        message: "Anda Tidak Memiliki Hak Untuk Mengubah Reflection Ini",
      });
    }
  }
};
