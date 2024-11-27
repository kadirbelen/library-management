import express from 'express';

import borrowController from '../controllers/borrow.controller';
import userController from '../controllers/user.controller';
import validator from '../middlewares/validation.middleware';
import { returnBookSchema } from '../validations/borrow.validation';
import { createUserSchema } from '../validations/user.validation';

const router = express.Router();

router.post('/', validator(createUserSchema), userController.create);
router.post('/:userId/borrow/:bookId', borrowController.borrowBook);
router.post('/:userId/return/:bookId', validator(returnBookSchema), borrowController.returnBook);
router.get('/:userId', userController.get);
router.get('/', userController.list);

export default router;
