import { Router } from 'express';

import { controller } from '../controllers/tasks.controller';
import { CreateTaskDto } from '../dto/create-task.dto';
import { validator } from '../middlewares/validator';

const router = Router();

router
  .get('/', controller.findMany)
  .post('/', validator(CreateTaskDto), controller.createOne)
  .patch('/:taskId', controller.updateOne);

export { router };
