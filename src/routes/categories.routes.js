import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

router.post("/categories", async (req, res) => {
  const newCategory = await prisma.category.create({
    data: req.body,
  });
  res.json(newCategory);
});

export default router;
