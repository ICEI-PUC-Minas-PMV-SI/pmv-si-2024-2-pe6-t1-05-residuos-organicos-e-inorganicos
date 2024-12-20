import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ItemsController from './app/controllers/ItemsController';
import PointsController from './app/controllers/PointsController';
import UsersController from './app/controllers/UsersController';
import { authMiddleware } from './app/middlewares/authMiddleware';

const routes = Router();
const upload = multer(multerConfig);

// Users routes
routes.post('/users/auth', UsersController.authenticateUser);
routes.post('/users/sign-out', authMiddleware, UsersController.signOutUser);

routes.get('/users', authMiddleware, UsersController.listUsers);
routes.get('/users/profile', authMiddleware, UsersController.getUserProfile);
routes.get('/users/:id', authMiddleware, UsersController.getUser);
routes.post('/users', UsersController.createUser);
routes.put('/users', authMiddleware, UsersController.updateUser)
routes.delete('/users', authMiddleware, UsersController.deleteUser)

// Items routes
routes.get('/items', authMiddleware, ItemsController.getItems);

// Points routes
routes.get('/points', authMiddleware, PointsController.listPoints);
routes.get('/points/:id', authMiddleware, PointsController.getPoint);
routes.post('/points', authMiddleware, upload.single('image'), PointsController.createPoint);
routes.put('/points/:id', authMiddleware, upload.single('image'), PointsController.updatePoint)
routes.delete('/points/:id', authMiddleware, PointsController.deletePoint)

export default routes;
