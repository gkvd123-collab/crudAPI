const { create, getUser, getUserById, updateUserById, deletUserById,getUserByUserEmail } = require('./user.service')
const { genSaltSync, hashSync,compareSync } = require('bcrypt');
const jwt=require('jsonwebtoken')
// const dotenv=require('dotenv').config();
// const { delete } = require('./user.router');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: 'database connection error',
                    err
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, result) => {
            if (err) {
                return res.json({

                    err: err
                });
            }
            if (!result) {
                return res.json({
                    message: 0,
                    message: "record not found"
                })
            }
            return res.json({
                success: 1,
                data: result
            })
        })
    },
    getUser: (req, res) => {
        getUser((err, result) => {
            if (err) {
                console.log(err, 'ertty');
                return res.json({

                    err: err
                });
            }
            return res.json({
                success: 1,
                data: result
            })
        })
    },
    updateUserById(req, res) {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        updateUserById(req.body, (err, result) => {
            if (err) {
                return res.json({
                    err: err
                })
            }
            return res.json({
                result: "user details upated successfully"
        
            })
        })
    },
    deleteUser(req, res) {
        const id = req.params.id;
        deletUserById(id, (err, result) => {
            if (err) {
                return res.json({ err })
            }
            else {
                return res.json({ message:"user deleted successfully"})
            }
        })
    },
    login:(req,res)=>{
      const body=req.body;
      getUserByUserEmail(body.email,(err,result)=>{
          if(err){
              return res.json({err})
          }
         if(!result){
            return res.json({message:"invalid email or password"})
         }
         const isValidPasword=compareSync(body.password,result.password);
         if(isValidPasword){
             const token=jwt.sign({result:result},process.env.secret_key,{expiresIn:'1h'})
             return res.json({token})
            }
            else{
                res.json({message:'invalid credential'})
            }
        
      })  
    }
}