import { Router } from 'express'

import { controller } from '../controllers/tasks.controller'

const router = Router()

router
  .get('/', controller.findMany)
  .post('/', controller.createOne)
  .patch('/:taskId', controller.updateOne)

export { router }
