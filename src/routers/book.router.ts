import express from 'express';

import bookController from '../controllers/book.controller';
import { paramsIdValidator } from '../middlewares/params-id-validator.middleware';
import validator from '../middlewares/validation.middleware';
import { createBookSchema } from '../validations/book.validation';

const router = express.Router();

router.post('/', validator(createBookSchema), bookController.create);
router.get('/:bookId', paramsIdValidator, bookController.get);
router.get('/', bookController.list);

export default router;
