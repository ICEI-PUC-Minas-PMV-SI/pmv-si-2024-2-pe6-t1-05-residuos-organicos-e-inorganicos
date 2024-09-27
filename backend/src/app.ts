import cors from 'cors';
import express from 'express';
import { resolve } from 'path';
import routes from './routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use(routes);
