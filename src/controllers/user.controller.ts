import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ConflictError } from '../errors/conflict.error';
import userService from '../services/user.service';
import { successResponse } from '../utils/success-response.utils';

class UserController {
  async create(req: Request, res: Response) {
    const userIsExist = await userService.getByUniqueField({ name: req.body.name });

    if (userIsExist) throw new ConflictError('User already exist');

    await userService.create(req.body);

    successResponse({ res, statusCode: StatusCodes.CREATED });
  }

  async list(_req: Request, res: Response) {
    const users = await userService.list();

    successResponse({ res, statusCode: StatusCodes.OK, data: users });
  }

  async get(req: Request, res: Response) {
    const userDetails = await userService.getDetails(parseInt(req.params.userId));

    successResponse({ res, statusCode: StatusCodes.OK, data: userDetails });
  }
}

export default new UserController();
