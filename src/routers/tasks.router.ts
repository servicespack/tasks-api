import { Router } from 'express'

import { controller } from '../controllers/tasks.controller'

const router = Router()

router
  .get('/', controller.findMany)
  .post('/', controller.createOne)
  .get('/:taskId', controller.findOne)
  .patch('/:taskId', controller.updateOne)
  .delete('/:taskId', controller.deleteOne)

export { router }
