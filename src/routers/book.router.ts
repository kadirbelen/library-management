import express from 'express';

import bookController from '../controllers/book.controller';
import validator from '../middlewares/validation.middleware';
import { createBookSchema } from '../validations/book.validation';

const router = express.Router();

router.post('/', validator(createBookSchema), bookController.create);
router.get('/:bookId', bookController.get);
router.get('/', bookController.list);

export default router;
