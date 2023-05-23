import { Router } from 'express';
import { BaseRoute } from '../BaseModels/BaseRouter';
import { DynamicRouteBuilder } from '../Utils/DynamicRouteBuilder';
import { IRouteConfig } from '../InterFaces/RouteHelper/DynamicRoute';
import { CategoryController } from '../Controllers/CategoryController';
export class CategoryRouter extends BaseRoute {
    protected basePath: string = 'categories';
    private categoryController: CategoryController;
    constructor(router: Router) {
        super(router);
        this.categoryController = new CategoryController();
    }

    protected makeDynamicRoutes() {
        const routes = this.makeDynicRouteList();
        DynamicRouteBuilder.build(routes, this.categoryController, this.router);
    }
    private makeDynicRouteList(): IRouteConfig[] {
        const routes: IRouteConfig[] = [
            {
                methods: ["get"],
                path: '/' + this.basePath + '/',
                middleWares: [],
                validators: [],
                handler: this.categoryController.getAllCategories
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + '/:categoryId',
                middleWares: [],
                validators: [],
                handler: this.categoryController.getCategoryByPk
            },
            {
                methods: ["post"],
                path: '/' + this.basePath + '/create',
                middleWares: [],
                validators: [],
                handler: this.categoryController.createCategory
            },
            {
                methods: ["put"],
                path: '/' + this.basePath + '/:categoryId',
                middleWares: [],
                validators: [],
                handler: this.categoryController.updateCategory
            }
        ]
        return routes;
    }
    protected initializeRoutes(): void {
        this.makeDynamicRoutes();
    }

}