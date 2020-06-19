const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const User= require('../models/User');

router.post('/', (req, res, next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if (user.length<1)
        {
            //no user found
            return res.status(401).json({//error 401: unauthorized
                message: "Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if (err){
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
            if (result){
                //generate a token not doing it now
                return res.status(200).json({
                    message: "Auth Successful"
                });
            }
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({//500:server error
            error: err
        });
    });
});

module.exports= router;