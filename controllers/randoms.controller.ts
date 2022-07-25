import { Request, Response } from 'express';
import { fork } from 'child_process';

export const getRandomNumbers = (req: Request, res: Response) => {
  const { amount } = req.query || 100000000;

  const child = fork("./utils/getRandom.js");
  child.send(amount);
  child.on("message", (msg) => {
    res.send(msg);
  });

  child.on("exit", (code) => {
    console.log("Se ha cerrado el proceso", code);
  });
});
};
