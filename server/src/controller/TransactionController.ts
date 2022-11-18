import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { AuthMiddleware } from "../middlewares/auth";

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    AuthMiddleware;

    console.log("BODYYYY", req.body);
    console.log("PARAMSSSS", req.params.id);

    const transactionInfoSchema = z.object({
      id: z.string(),
      description: z.string(),
      price: z.number(),
      category: z.string(),
      type: z.string(),
    });

    const transactionInfo = transactionInfoSchema.parse({
      id: req.params.id,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      type: req.body.type,
    });

    const transaction = await prisma.transaction.create({
      data: {
        userId: transactionInfo.id,
        description: transactionInfo.description,
        price: transactionInfo.price,
        category: transactionInfo.category,
        type: transactionInfo.type,
      },
    });

    return res.json(transaction);
  }
  async getTransaction(req: Request, res: Response) {
    AuthMiddleware;
    let q = req.query["q"];
    const userId = req.params.id;
    if (q) {
      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          AND: [
            {
              description: {
                contains: String(q),
              },
            },
          ],
        },
      });
      console.log("LOG", transactions);
      return res.json(transactions);
    } else {
      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
        },
      });

      console.log("LOG", transactions);
      return res.json(transactions);
    }
  }
}
