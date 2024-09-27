import { Request, Response } from 'express';
import knex from '../../database/connection';

export default new class PointsController {
  async listPoints(req: Request, res: Response) {
    const { city, uf, items, page = 1, limit = 10 } = req.query;

    if (!city || !uf || !items) {
      return res.status(400).json({
        message: 'Os campos de filtros para Cidade, UF e a lista de itens são obrigatórios.'
      });
    }

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const pointsQuery = knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where(knex.raw('LOWER(city) = LOWER(?)', city))
      .where(knex.raw('LOWER(uf) = LOWER(?)', uf))
      .distinct()
      .select('points.*')
      .limit(limitNumber)
      .offset(offset)
      .orderBy('points.name');

    const countQuery = knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where(knex.raw('LOWER(city) = LOWER(?)', city))
      .where(knex.raw('LOWER(uf) = LOWER(?)', uf))
      .countDistinct('points.id as total');

    const [points, total] = await Promise.all([pointsQuery, countQuery]);

    const serializedPoints = points.map(point => ({
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    }));

    const totalItems = total[0].total;
    const totalPages = Math.ceil(Number(totalItems) / limitNumber);

    return res.json({
      data: serializedPoints,
      pagination: {
        totalItems,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  }

  async getPoint(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return res.status(400).json({ error: 'Ponto não encontrado.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://localhost:3333/uploads/${point.image}`,
    };

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');

    return res.json({ point: serializedPoint, items });
  }

  async createPoint(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
      } = req.body;

      const trx = await knex.transaction();

      const point = {
        image: req?.file?.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      }

      const [result] = await trx('points').insert(point).returning('id');

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => ({
          item_id,
          point_id: result.id,
        }));

      await trx('point_items').insert(pointItems);

      await trx.commit();

      return res.json({ id: result.id, ...point });
    } catch {
      return res.status(400).json({
        message: 'Não foi possível criar o ponto, verifique as informações enviadas e tente novamente.'
      })
    }
  }

  async updatePoint(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    try {
      const trx = await knex.transaction();

      const point = await trx('points').where('id', id).first();

      if (!point) {
        await trx.rollback();
        return res.status(404).json({ message: 'Ponto não encontrado.' });
      }

      const updatedPoint = {
        name: name || point?.name,
        email: email || point?.email,
        whatsapp: whatsapp || point?.whatsapp,
        latitude: latitude || point?.latitude,
        longitude: longitude || point?.longitude,
        city: city || point?.city,
        uf: uf || point?.uf,
        image: req?.file?.filename || point.image,
      };

      await trx('points').where('id', id).update(updatedPoint);

      if (items) {
        const pointItems = items
          .split(',')
          .map((item: string) => Number(item.trim()))
          .map((item_id: number) => ({
            item_id,
            point_id: id,
          }));

        await trx('point_items').where('point_id', id).del();
        await trx('point_items').insert(pointItems);
      }

      await trx.commit();

      return res.json({
        point: { id, ...updatedPoint },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Não foi possível atualizar o ponto. Tente novamente mais tarde.',
      });
    }
  }

  async deletePoint(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const trx = await knex.transaction();

      const point = await trx('points').where('id', id).first();

      if (!point) {
        await trx.rollback();
        return res.status(404).json({ message: 'Ponto não encontrado.' });
      }

      await trx('point_items').where('point_id', id).del();

      await trx('points').where('id', id).del();

      await trx.commit();

      return res.status(204).json()
    } catch (error) {
      return res.status(500).json({
        message: 'Não foi possível deletar o ponto. Tente novamente mais tarde.'
      });
    }
  }
}
