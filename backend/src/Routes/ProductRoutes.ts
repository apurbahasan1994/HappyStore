import { Router } from 'express';
import { BaseRoute } from '../BaseModels/BaseRouter';
import { ProductController } from '../Controllers/ProductController';
import { DynamicRouteBuilder } from '../Utils/DynamicRouteBuilder';
import { IRouteConfig } from '../InterFaces/RouteHelper/DynamicRoute';
import { AuthenticationCheck } from '../Middlewares/AuthMiddleWare';
export class ProductRouter extends BaseRoute {
    protected basePath: string = 'products';
    private prodcutController: ProductController;
    constructor(router: Router) {
        super(router);
        this.prodcutController = new ProductController();
    }

    protected makeDynamicRoutes() {
        const routes = this.makeDynicRouteList();
        DynamicRouteBuilder.build(routes, this.prodcutController, this.router);
    }
    private makeDynicRouteList(): IRouteConfig[] {
        const routes: IRouteConfig[] = [
            {
                methods: ["get"],
                path: '/' + this.basePath + '/',
                middleWares: [],
                validators: [],
                handler: this.prodcutController.getAllProducts
            },
            {
                methods: ["post"],
                path: '/' + this.basePath + '/create',
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.prodcutController.createProduct
            },
            {
                methods: ["post"],
                path: '/' + this.basePath + '/createWithCategory',
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.prodcutController.createProductWithCategories
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + `/withCategory`,
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.prodcutController.getAllProductsWithCategories
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + `/featured`,
                middleWares: [],
                validators: [],
                handler: this.prodcutController.getFeaturedProducts
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + `/category`,
                middleWares: [],
                validators: [],
                handler: this.prodcutController.getProductByCategory
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + `/:productId`,
                middleWares: [],
                validators: [],
                handler: this.prodcutController.getProductByPk
            },
        ]
        return routes;
    }
    protected initializeRoutes(): void {
        this.makeDynamicRoutes();
    }

}