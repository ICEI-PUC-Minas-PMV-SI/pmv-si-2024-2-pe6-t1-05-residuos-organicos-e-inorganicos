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
