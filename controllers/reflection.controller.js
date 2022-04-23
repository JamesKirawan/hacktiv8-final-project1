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

exports.getReflection = async (req, res) => {
  await db.query("select * from Reflections").then(result => {
      res.status(200).json({
          "data": result.rows
      })
  }).catch(e => {
      console.log(e)
      res.status(500).json({
          message : 'INTERNAL SERVER ERROR'
      })
  })
}

exports.deleteReflection = async(req, res) => {
  const id = req.params.id
  await db.query("delete from Reflections where id = $1", [id]).then(result => {
          res.status(200).json({
              "data": "sukses",
          })
      })
      .catch(e => {
          console.log(e)
          res.status(404).json({
              "message": "INTERNAL SERVER ERROR"
          })
      })
};

exports.updateReflection = async(req, res) => {
  const id = req.params.id
  let success = req.body.success;
  let low_point = req.body.low_point;
  let take_away = req.body.take_away;

  await db.query("UPDATE Reflections SET success = $1, low_point =$2, take_away=$3 WHERE id = $4", [success, low_point, take_away, id])
      .then(result => {
          res.status(200).json({
              "status": "sukses",
          });
      }).catch(e => {
          console.log(e)
          res.status(404).json({
              "message": "INTERNAL SERVER ERROR"
          })
      })
}
