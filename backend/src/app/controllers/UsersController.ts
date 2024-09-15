import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import knex from "../../database/connection";

const JWT_SECRET = "ecoponto";

export default new (class UsersController {
	async getUser(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const user = await knex("users")
				.select("id", "name", "email", "created_at", "updated_at")
				.where("id", id)
				.first();

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado." });
			}

			return res.json(user);
		} catch (error) {
			return res.status(500).json({ message: "Erro ao obter usuário.", error });
		}
	}

	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		const { name, email, password } = req.body;

		try {
			const user = await knex("users").where("id", id).first();

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado." });
			}

			if (email && email !== user.email) {
				const emailExists = await knex("users").where("email", email).first();
				if (emailExists) {
					return res.status(400).json({ message: "Email já está em uso." });
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

			await knex("users").update(updatedUser).where("id", id);

			return res.json({ message: "Usuário atualizado com sucesso." });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Erro ao atualizar usuário.", error });
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const user = await knex("users").where("id", id).first();

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado." });
			}

			await knex("users").where("id", id).del();

			return res.status(204).json();
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Erro ao deletar usuário.", error });
		}
	}
})();
