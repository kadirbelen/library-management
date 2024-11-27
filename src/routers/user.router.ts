import express from 'express';

import userController from '../controllers/user.controller';
import validator from '../middlewares/validation.middleware';
import { createUserSchema } from '../validations/user.validation';

const router = express.Router();

router.post('/', validator(createUserSchema), userController.create);
router.get('/:userId', userController.get);
router.get('/', userController.list);

export default router;
