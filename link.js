import express from 'express'
import { addTask, delTask, listTask } from './task_controller.js'

const router = express.Router()

router.post('/addtask', addTask)
router.delete('/deltask/:taskId', delTask)
router.get('/listtask', listTask)

export default router