import { Request, Response } from 'express';
import Contenedor from '../models/Contenedor';
import { StoredProduct } from '../interfaces';

const container: Contenedor = new Contenedor('./data/productos.txt');

export const getProducts = async (_req: Request, res: Response) => {
  const body: StoredProduct[] = await container.getAll();

  res.json(body);
};

export const getRandomProduct = async (_req: Request, res: Response) => {
  const products: StoredProduct[] = await container.getAll();
  const randomProduct: StoredProduct =
    products[Math.floor(Math.random() * products.length)];

  res.json(randomProduct);
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'getProduct',
    id,
  });
};

export const postProduct = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: 'postProduct',
    body,
  });
};

export const putProduct = (req: Request, res: Response) => {
  // const { id } = req.params;
  const { body } = req;

  res.json({
    msg: 'putProduct',
    body,
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'deleteProduct',
    id,
  });
};
