/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UserController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  })
)

export default usersRouter;
