import express from "express";
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", categoriesRoutes);

app.listen(3000);
console.log("Server on port", 3000);
