const express = require('express')
const router = express.Router()

const bookController = require('../controllers/bookController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')

//apis
router.post("/createUser",userController.createUser)
router.post("/createBook",bookController.createBook)

module.exports = router