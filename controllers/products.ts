import { Request, Response } from 'express';
// import Container from '../models/containers/product.fileContainer';
import selectDbContainerProducts from '../utils/selectDbContainerProducts';

export const getProducts = async (_req: Request, res: Response) => {
  const { default: Container }: any = await selectDbContainerProducts();

  const products = await Container.getAll();

  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { default: Container }: any = await selectDbContainerProducts();

  const { id } = req.params;
  const body = await Container.getById(Number(id));

  res.json(body);
};

export const postProduct = async (req: Request, res: Response) => {
  const { default: Container }: any = await selectDbContainerProducts();

  const product = req.body;

  const storedProduct = await Container.save(product);
  res.json(storedProduct);
};

export const putProduct = async (req: Request, res: Response) => {
  const { default: Container }: any = await selectDbContainerProducts();

  const { id } = req.params;
  const { body } = req;

  await Container.update(Number(id), body);

  res.json({
    msg: `producto ${id} actualizado`,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { default: Container }: any = await selectDbContainerProducts();

  const { id } = req.params;
  await Container.deleteById(Number(id));

  res.json({
    msg: `producto ${id} eliminado`,
  });
};
