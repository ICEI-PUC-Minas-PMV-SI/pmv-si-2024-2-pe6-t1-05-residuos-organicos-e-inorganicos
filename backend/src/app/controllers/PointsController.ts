import { Request, Response } from 'express';
import knex from '../../database/connection';

export default new class PointsController {
  async listAllPoints(req: Request, res: Response) {
    const { city, uf, items, page = 1, limit = 10 } = req.query;
  
    if (!city || !uf || !items) {
      return res.status(400).json({
        message: 'Os campos de filtros para Cidade, UF e a lista de pontos são obrigatórios.'
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
      .offset(offset);
  
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

      const [insertedIds] = await trx('points').insert(point);

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => ({
          item_id,
          point_id: insertedIds,
        }));

      await trx('point_items').insert(pointItems);

      await trx.commit();

      return res.json({ id: insertedIds, ...point });
    } catch {
      return res.status(400).json({
        message: 'Não foi possível criar o ponto, verifique as informações enviadas e tente novamente.'
      })
    }
  }
}
