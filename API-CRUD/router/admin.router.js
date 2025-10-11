const { Router } = require("express");
const {getAlluser,getUser,deleteUser,createUser,updateUser,login,logout} = require('../controller/user.controller');
const { auth } = require("../middleware/auth.middleware");
const router = Router()

router.post('/login',login)
router.get('/logout',logout)

router.post('/create',createUser)

router.get('/',auth,getAlluser)
router.get('/:id',getUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)


module.exports = router