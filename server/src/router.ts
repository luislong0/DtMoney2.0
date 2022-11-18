import { Router } from "express";
import { TransactionController } from "./controller/TransactionController";
import { UserController } from "./controller/UserController";

const userController = new UserController();
const transactionController = new TransactionController();

export const router = Router();

router.post("/users", userController.createUser);

router.get("/me", userController.getUser);

router.get("/transactions/:id", transactionController.getTransaction);

router.post("/transactions/:id", transactionController.createTransaction);
