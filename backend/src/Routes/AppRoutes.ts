import { Router } from 'express';
import { BaseRoute } from '../BaseModels/BaseRouter';
import { AuthRouter } from './AuthRoutes';
import { ProductRouter } from './ProductRoutes';
import { CategoryRouter } from './categoryRoutes';
export class AppRoute extends BaseRoute {
  protected basePath: string = '/';
  private authRouter: AuthRouter;
  private productRoter : ProductRouter;
  private categoryRouter : CategoryRouter
  constructor(router: Router) {
    super(router);
    this.authRouter = new AuthRouter(this.router);
    this.productRoter = new ProductRouter(this.router);
    this.categoryRouter = new CategoryRouter(this.router);
  }
  protected initializeRoutes(): void {
    this.authRouter.registerRoutes();
    this.productRoter.registerRoutes();
    this.categoryRouter.registerRoutes();
  }
  protected makeDynamicRoutes(): void {
  }
}