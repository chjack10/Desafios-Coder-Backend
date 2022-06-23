import { Request, Response } from 'express';

import { cartDao as api } from '../models/daos/index';

export const createCart = async (_req: Request, res: Response) => {
  const cartId = await api.createNew();

  res.json(cartId);
};

export const addToCartById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = req.body;

  const cart = await api.addProductsById(Number(id), products);

  if (cart instanceof Error) {
    return res.status(500).json({
      error: -1,
      msg: cart.message,
    });
  }

  res.json(cart);
};

export const emptyCartById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cart = await api.deleteById(Number(id));

  if (cart instanceof Error) {
    return res.status(500).json({
      error: -1,
      msg: cart.message,
    });
  }

  res.json(cart);
};

export const deleteProductByCartId = async (req: Request, res: Response) => {
  const { id, id_prod } = req.params;

  const cart = await api.deleteItemById(Number(id), Number(id_prod));

  if (cart instanceof Error) {
    return res.status(500).json({
      error: -1,
      msg: cart.message,
    });
  }

  res.json(cart);
};

export const getProductsByCartId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cart = await api.getById(Number(id));
  if (cart instanceof Error) {
    return res.status(500).json({
      error: -1,
      msg: cart.message,
    });
  }

  res.json(cart);
};
