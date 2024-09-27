import jwt from 'jsonwebtoken';

const JWT_SECRET = 'ecoponto';

const e2eToken = jwt.sign(
  { id: 1, email: 'e2e@mail.com' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

export { e2eToken };
