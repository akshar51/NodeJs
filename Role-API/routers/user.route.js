const { Router } = require("express");
const userCtl = require('../controller/user.controller')
const userRouter = Router()

userRouter.post('/',userCtl.createUser)

module.exports = userRouter