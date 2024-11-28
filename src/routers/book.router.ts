import express from 'express';

import bookController from '../controllers/book.controller';
import bodyValidator from '../middlewares/body-validator.middleware';
import { paramsIdValidator } from '../middlewares/params-id-validator.middleware';
import { createBookSchema } from '../validations/book.validation';

const router = express.Router();

router.post('/', bodyValidator(createBookSchema), bookController.create);
router.get('/:bookId', paramsIdValidator, bookController.get);
router.get('/', bookController.list);

export default router;
