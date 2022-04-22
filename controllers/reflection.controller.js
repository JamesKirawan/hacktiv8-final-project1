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
  try {
    const { rows } = await db.query(queryText);
    return res.status(200).send({
      id: rows[0].id,
      success: rows[0].success,
      low_point: rows[0].low_point,
      take_away: rows[0].take_away,
      owner_id: rows[0].owner_id,
      created_date: rows[0].created_date,
      modified_date: rows[0].modified_date,
    });
  } catch (e) {
    return res.status(503).send(e);
  }
};

// // exports.getReflection = async (req, res) => {
// //   return Reflection.findAll()
// //     .then((reflection) => {
// //       res.status(201).send({
// //         data: reflection,
// //       });
// //     })
// //     .catch((e) => {
// //       console.log(e);
// //       res.status(503).send({
// //         status: "FAIL",
// //         message: "Gagal menampilkan refleksi",
// //       });
// //     });
// // };

// // exports.deleteReflection = async (req, res) => {
// //   const id = req.params.id;
// //   return Reflection.destroy({ where: { id: id } })
// //     .then((reflection) => {
// //       res.status(201).json({
// //         data: "sukses",
// //       });
// //     })
// //     .catch((e) => {
// //       console.log(e);
// //       res.status(503).json({
// //         message: "INTERNAL SERVER ERROR",
// //       });
// //     });
// // };

// // exports.putReflection = async (req, res) => {
// //   const id = req.params.id;
// //   let success = req.body.success;
// //   let low_point = req.body.low_point;
// //   let take_away = req.body.take_away;

// //   const user_id = req.user_id;
// //   let data = {
// //     success,
// //     low_point,
// //     take_away,
// //     user_id,
// //   };
// //   return Reflection.update(data, {
// //     where: {
// //       id: id,
// //     },
// //   })
// //     .then((reflection) => {
// //       res.status(201).send({
// //         status: "Berhasil mengupdate reflection",
// //         data: reflection,
// //       });
// //     })
// //     .catch((e) => {
// //       console.log(e);
// //       res.status(503).send({
// //         message: "Gagal mengupdate reflection",
// //       });
// //     });
// // };
