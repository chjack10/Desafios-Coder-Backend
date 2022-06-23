import { Request, Response } from 'express';

import { productDao as api } from '../models/daos/index';

export const getProducts = async (_req: Request, res: Response) => {
  const products = await api.getAll();

  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await api.getById(Number(id));

  res.json(body);
};

export const postProduct = async (req: Request, res: Response) => {
  const product = req.body;

  const storedProduct = await api.save(product);
  res.json(storedProduct);
};

export const putProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  await api.update(Number(id), body);

  res.json({
    msg: `producto ${id} actualizado`,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await api.deleteById(Number(id));

  res.json({
    msg: `producto ${id} eliminado`,
  });
};
