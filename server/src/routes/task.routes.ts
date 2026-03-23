import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res, next) => taskController.list(req as any, res, next));
router.get('/:id', (req, res, next) => taskController.getById(req as any, res, next));
router.post('/', validate(createTaskSchema), (req, res, next) => taskController.create(req as any, res, next));
router.put('/:id', validate(updateTaskSchema), (req, res, next) => taskController.update(req as any, res, next));
router.delete('/:id', (req, res, next) => taskController.delete(req as any, res, next));

export default router;