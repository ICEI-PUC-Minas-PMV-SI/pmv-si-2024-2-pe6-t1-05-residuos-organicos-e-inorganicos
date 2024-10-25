import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { resolve } from 'path';
import routes from './routes';

export const app = express();
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  allowedHeaders: ['content-type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  origin: 'http://localhost:5173'
}));

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use(routes);
