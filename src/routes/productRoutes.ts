import express from "express";
import { ProductController } from "../controllers/ProductController";
import { ProductRepository } from "../repositories/productRepository";
import { ProductInteractor } from "../interactors/productInteractor";
import { Mailer } from "../external-libraries/mailer";
import { MessageBroker } from "../external-libraries/messageBroker";
import { Container } from "inversify";
import { IProductRepository } from "../interfaces/IPorductRepository";
import { INTERFACE_TYPE } from "../utils/appConst";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IMailer } from "../interfaces/IMailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";

// const repository = new ProductRepository();
// const mailer = new Mailer();
// const broker = new MessageBroker();
// const interactor = new ProductInteractor(repository, mailer, broker);
// const controller = new ProductController(interactor);
const container = new Container();
container
  .bind<IProductRepository>(INTERFACE_TYPE.ProductRepository)
  .to(ProductRepository);
container
  .bind<IProductInteractor>(INTERFACE_TYPE.ProductInteractor)
  .to(ProductInteractor);
container.bind<IMailer>(INTERFACE_TYPE.Mailer).to(Mailer);
container.bind<IMessageBroker>(INTERFACE_TYPE.MessageBroker).to(MessageBroker);
container.bind(INTERFACE_TYPE.ProductController).to(ProductController);
const controller = container.get<ProductController>(
  INTERFACE_TYPE.ProductController
);
const router = express.Router();

router.post("/products", controller.onCreateProduct.bind(controller));

router.get("/products", controller.onGetProducts.bind(controller));

router.patch("/products/:id", controller.onUpdateStock.bind(controller));

export default router;
