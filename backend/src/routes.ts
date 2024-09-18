import { Router } from "express";
import multer from "multer";

import multerConfig from "./config/multer";

// import ItemsController from './app/controllers/ItemsController';
import PointsController from './app/controllers/PointsController';
import UsersController from './app/controllers/UsersController';
import { authMiddleware } from "./app/middlewares/authMiddleware";

const routes = Router();
const upload = multer(multerConfig);

// Users routes
// routes.post('/users/auth', UsersController.authenticateUser);

routes.get("/users/:id", authMiddleware, UsersController.getUser);
routes.get("/users", authMiddleware, UsersController.listUsers);
routes.post('/users', UsersController.createUser);
routes.put("/users/:id", authMiddleware, UsersController.updateUser);
routes.delete("/users/:id", authMiddleware, UsersController.deleteUser);

// Items routes
// routes.get('/items', authMiddleware, ItemsController.getItems);

// Points routes
// routes.get('/points/:id', authMiddleware, PointsController.listPoint);
routes.get('/points', authMiddleware, PointsController.listAllPoints);
// routes.post('/points', authMiddleware, upload.single('image'), PointsController.createPoint);
// routes.put('/points/:id', authMiddleware, upload.single('image'), PointsController.updatePoint)
// routes.delete('/points/:id', authMiddleware, PointsController.deletePoint)

export default routes;
