import { Request, Response } from 'express';
import Products from '../models/Products';

export const getProducts = (_req: Request, res: Response) => {
  const body = Products.getAll();

  res.json(body);
};

export const getProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const body = Products.getById(Number(id));

  res.json(body);
};

export const postProduct = (req: Request, res: Response) => {
  const product = req.body;
  const storedProduct = Products.add(product);

  res.json(storedProduct);
};

export const putProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  Products.update(Number(id), body);

  res.json({
    msg: `producto ${id} actualizado`,
  });
};

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  Products.deleteById(Number(id));

  res.json({
    msg: `producto ${id} eliminado`,
  });
};

// import { Request, Response } from 'express';
// import { StoredProduct } from '../interfaces';
// import Products from '../models/Contenedor';

// export const getProducts =  (_req: Request, res: Response) => {
//   const body: StoredProduct[] =  Products.getAll();

//   res.json(body);
// };

// export const getProduct =  (req: Request, res: Response) => {
//   const { id } = req.params;
//   const body =  Products.getById(Number(id));

//   res.json(body);
// };

// export const postProduct =  (req: Request, res: Response) => {
//   const product = req.body;
//   const id =  Products.save(product);

//   res.json({ ...product, id });
// };

// export const putProduct = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;
//   Products.update(Number(id), body);

//   res.json({
//     msg: `producto ${id} actualizado`,
//   });
// };

// export const deleteProduct = (req: Request, res: Response) => {
//   const { id } = req.params;
//   Products.deleteById(Number(id));

//   res.json({
//     msg: `producto ${id} eliminado`,
//   });
// };
