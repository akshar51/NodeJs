const { Router } = require("express");
const {getAlluser,getUser,deleteUser,createUser,updateUser,login} = require('../controller/user.controller')
const router = Router()

router.get('/',getAlluser)
router.get('/:id',getUser)

router.delete('/:id',deleteUser)

router.post('/create',createUser)
router.put('/:id',updateUser)

router.post('/login',login)

module.exports = router