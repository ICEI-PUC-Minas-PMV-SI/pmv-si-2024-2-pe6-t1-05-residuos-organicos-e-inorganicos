import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import knex from '../../database/connection';

const JWT_SECRET = 'ecoponto';

export default new class UsersController {
  async authenticateUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await knex('users').where('email', email).first();
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao autenticar usuário.', error });
    }
  }

  async listUsers(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    try {
      const users = await knex('users')
        .select('id', 'name', 'email', 'created_at', 'updated_at')
        .limit(limitNumber)
        .offset(offset);

      const totalUsers = await knex('users').count('* as count').first();

      return res.json({
        data: users,
        pagination: {
          totalItems: totalUsers?.count,
          totalPages: Math.ceil(Number(totalUsers?.count) / limitNumber),
          currentPage: pageNumber,
          limit: limitNumber,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar usuários.', error });
    }
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await knex('users')
        .select('id', 'name', 'email', 'created_at', 'updated_at')
        .where('id', id)
        .first();

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao obter usuário.', error });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await knex('users').where('email', email).first();
      if (userExists) {
        return res.status(400).json({ message: 'Email já está em uso.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
      };

      const [id] = await knex('users').insert(newUser);

      return res.status(201).json({ id, name, email });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar usuário.', error });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await knex('users').where('id', id).first();

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      if (email && email !== user.email) {
        const emailExists = await knex('users').where('email', email).first();
        if (emailExists) {
          return res.status(400).json({ message: 'Email já está em uso.' });
        }
      }

      let hashedPassword = user.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        updated_at: knex.fn.now(),
      };

      await knex('users').update(updatedUser).where('id', id);

      return res.json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await knex('users').where('id', id).first();

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      await knex('users').where('id', id).del();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar usuário.', error });
    }
  }
}
