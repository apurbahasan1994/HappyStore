import { RequestHandler, Router } from "express";
import { IRouteConfig } from "../InterFaces/RouteHelper/DynamicRoute";
import { BaseController } from "../BaseModels/BaseController";

export class DynamicRouteBuilder {
    static build(routes: IRouteConfig[], controller:BaseController, router:Router) {
        try {
            routes.forEach((route) => {
                let { path, methods, middleWares, handler, validators } = route;
                handler = handler.bind(controller);
                methods.forEach(method => {
                    router[method](path, middleWares, validators, handler);
                });
            })
        }
        catch (e) {
            console.log(e.message);
        }
    }
}