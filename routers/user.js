const express= require('express')
const UserCtrl=require('../controllers/UserController')
const {authMdw, requireAdmin}=require('../middlewares/auth')
const router=express.Router();

router.get('/', authMdw, requireAdmin, async (req, res)=>{
    const users= await UserCtrl.getUsers();
    res.json(users)
})

module.exports=router;