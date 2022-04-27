import { Request, Response } from 'express';
import { StoredProduct } from '../interfaces';
import Container from '../models/Contenedor';

export const getProducts = async (_req: Request, res: Response) => {
  const body: StoredProduct[] = await Container.getAll();

  res.json(body);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = await Container.getById(Number(id));

  res.json(body);
};

export const postProduct = async (req: Request, res: Response) => {
  const { body: product } = req;
  const id = await Container.save(product);

  res.json({ ...product, id });
};

export const putProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  Container.update(Number(id), body);

  res.json({
    msg: `producto ${id} actualizado`,
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  Container.deleteById(Number(id));

  res.json({
    msg: `producto ${id} eliminado`,
  });
};
