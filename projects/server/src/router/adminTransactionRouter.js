const express = require('express')
const {adminTransactionController} = require('../controller')
const Router = express.Router()
const { tokenVerify } = require('../middleware/verifyToken')

Router.get("/get", tokenVerify, adminTransactionController.getTransaction)

module.exports = Router