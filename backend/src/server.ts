import cors from 'cors';
import express from 'express';
import { resolve } from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use(routes);

app.listen(3333, () => {
  console.log('SERVER IS RUNNING AT :3333');
});
