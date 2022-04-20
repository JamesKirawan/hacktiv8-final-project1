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

exports.getReflection = async (req, res) => {
  return Reflection.findAll().then(reflection=> {
    res.status(201).send({
        status : "SUCCES",
        data: reflection
        })
    })
    .catch(e => {
    console.log(e)
    res.status(503).send({
        status : "FAIL",
        message : 'Gagal menampilkan refleksi'
      });
    });
};

exports.deleteReflection = async(req, res) => {
  const id = req.params.id
  return Reflection.destroy( {where : {id:id}} ).then (reflection => {
    res.status(201).json({
      "data": "sukses",
       })
    })  
      .catch(e => {
          console.log(e)
          res.status(503).json({
              "message": "INTERNAL SERVER ERROR"
          });
      });
};

  exports.putReflection = async(req, res) => {
      const id = req.params.id      
      let success = req.body.success;
      let low_point = req.body.low_point;
      let take_away = req.body.take_away;
   
      const user_id = req.user_id
        let data = {
        success,
        low_point,
        take_away,
        user_id,
      };
        return Reflection.update(data,{
          where: {
            id: id
          }
        } 
        )
        .then(hasil => {
                res.status(201).send({
                    "status": "Berhasil mengupdate reflection",
                    "data" : hasil,
  
                });
            })
            .catch(e => {
                console.log(e)
                res.status(503).send({
                    "message": "Gagal mengupdate reflection"
                });
            });
          };
