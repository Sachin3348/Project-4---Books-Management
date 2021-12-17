const express = require('express')
const router = express.Router()

const bookController = require('../controllers/bookController')
const userController = require('../controllers/userController')
const reviewController = require('../controllers/reviewController')
const middleware = require('../middleware/authentication')

//apis
router.post("/createUser", userController.createUser)
router.post("/createBook", middleware.authentication, bookController.createBook)
router.post("/login", userController.loginUser)
router.get("/books", middleware.authentication, bookController.getBooks)
router.get("/books/:bookId", middleware.authentication, bookController.getBooksById)
router.put("/books/:bookId", middleware.authentication, bookController.updateBook)

module.exports = router