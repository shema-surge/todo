const {Router} = require('express')
const {getAllTasks} = require('../model/taskDao')

const router = Router()

module.exports = router