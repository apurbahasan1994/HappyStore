import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { BaseRoute } from '../BaseModels/BaseRouter';
import { AuthController } from '../Controllers/AuthController';
import { DynamicRouteBuilder } from '../Utils/DynamicRouteBuilder';
import { IRouteConfig } from '../InterFaces/RouteHelper/DynamicRoute';
export class AuthRouter extends BaseRoute {
  protected basePath: string = 'auth';
  private authController: AuthController;
  constructor(router: Router) {
    super(router);
    this.authController = new AuthController();
  }
  
  protected makeDynamicRoutes() {
    const routes = this.makeDynicRouteList();
    DynamicRouteBuilder.build(routes, this.authController, this.router);
  }
  private makeDynicRouteList(): IRouteConfig[] {
    const routes: IRouteConfig[] = [
      {
        methods: ["post"],
        path: '/' + this.basePath + '/signUp',
        middleWares: [],
        validators: [],
        handler: this.authController.signUp
      },
      {
        methods: ["post"],
        path: '/' + this.basePath + '/signIn',
        middleWares: [],
        validators: [],
        handler: this.authController.signIn
      },
      {
        methods: ["post"],
        path: '/' + this.basePath + '/refresh',
        middleWares: [],
        validators: [],
        handler: this.authController.refresh
      }
    ]
    return routes;
  }
  protected initializeRoutes(): void {
    this.makeDynamicRoutes();
  }

}