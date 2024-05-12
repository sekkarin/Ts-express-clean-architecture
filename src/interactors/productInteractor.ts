import { inject, injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { IProductRepository } from "../interfaces/IPorductRepository";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { INTERFACE_TYPE } from "../utils/appConst";
@injectable()
export class ProductInteractor implements IProductInteractor {
  private repository: IProductRepository;
  private mailer: IMailer;
  private broker: IMessageBroker;
  constructor(
    @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository,
    @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
    @inject(INTERFACE_TYPE.MessageBroker) broker: IMessageBroker
  ) {
    this.repository = repository;
    this.mailer = mailer;
    this.broker = broker;
  }
  async createProduct(input: any) {
    const data = await this.repository.create(input);
    await this.mailer.SendMail("...", data);
    return data;
  }
  updateStack(id: number, stack: number) {
    return this.repository.update(id, stack);
  }
  getProducts(limit: number, offset: number) {
    return this.repository.find(limit, offset);
  }
}
