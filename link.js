import express from 'express'
import { addTask, delTask, listTask } from './controller.js'

const router = express.Router()

router.post('/addtask', addTask)
router.post('/deltask', delTask)
router.post('/listtask', listTask)

export default router