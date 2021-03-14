const {createUser,getUserById,getUser,updateUserById,deleteUser,login}=require('./user.controller');
 const { checkToken } = require('../../auth/token_validation');

const router=require('express').Router();

router.post("/",createUser);
router.get("/:id",checkToken,getUserById);
router.get("/",checkToken,getUser);
router.put("/",checkToken,updateUserById);
router.delete("/:id",checkToken,deleteUser);
router.post("/login",login)



module.exports=router