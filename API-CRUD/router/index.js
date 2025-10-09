const { Router } = require("express");

const router = Router()
router.use('/user',require('./admin.router'))

module.exports = router