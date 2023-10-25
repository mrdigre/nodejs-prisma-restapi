import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  if (!products) return res.status(404).json({ error: "Products not found" });
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const productUnique = await prisma.product.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productUnique)
    return res.status(404).json({ error: "Product not found" });
  return res.json(productUnique);
});

router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(newProduct);
});

router.put("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const name = req.body.name;
    const price = req.body.price;
    const stock = req.body.stock;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found" });

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, price, stock },
    });

    return res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  const productDelete = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productDelete)
    return res.status(404).json({ error: "Product not found" });
  return res.json(productDelete);
});

export default router;
