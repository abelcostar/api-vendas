import productsRouter from "@modules/products/routes/products.routs";
import { Router, response } from "express";
import { request } from "http";

const routes = Router()

routes.use('/products', productsRouter)

export default routes
