import express from "express";

import { decode, sign, verify } from "jsonwebtoken";
import { record, z } from "zod";
import { prisma } from "./lib/prisma";
import { AuthMiddleware } from "./middlewares/auth";
import { router } from "./router";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
