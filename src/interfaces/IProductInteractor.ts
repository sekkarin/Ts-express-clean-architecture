export interface IProductInteractor {
  createProduct(input: any): any;
  updateStack(id: number, stack: number): any;
  getProducts(limit: number, offset: number): any;
}
