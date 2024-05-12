import { NextFunction, Request, Response } from "express";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appConst";

@injectable()
export class ProductController {
  private interactor: IProductInteractor;
  constructor(
    @inject(INTERFACE_TYPE.ProductInteractor) interactor: IProductInteractor
  ) {
    this.interactor = interactor;
  }
  public async onCreateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      // validate logic
      const data = await this.interactor.createProduct(body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  public async onGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const offset = parseInt(`${req.query.offset}`) || 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.getProducts(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  public async onUpdateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.params.id}`);
      const body = req.body;

      const data = await this.interactor.updateStack(id, body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
