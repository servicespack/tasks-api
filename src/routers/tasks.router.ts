import { Router } from 'express'

import { CreateTaskDto } from '../dto/create-task.dto'
import { controller } from '../controllers/tasks.controller'
import { validator } from '../middlewares/validator'

const router = Router()

router
  .get('/', controller.findMany)
  .post('/', validator(CreateTaskDto), controller.createOne)
  .patch('/:taskId', controller.updateOne)

export { router }
