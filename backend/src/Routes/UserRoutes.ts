import { Router } from 'express';
import { BaseRoute } from '../BaseModels/BaseRouter';
import { DynamicRouteBuilder } from '../Utils/DynamicRouteBuilder';
import { IRouteConfig } from '../InterFaces/RouteHelper/DynamicRoute';
import { UserController } from '../Controllers/UserController';
import { AuthenticationCheck } from '../Middlewares/AuthMiddleWare';
export class UserRouter extends BaseRoute {
    protected basePath: string = 'users';
    private userController: UserController;
    constructor(router: Router) {
        super(router);
        this.userController = new UserController();
    }

    protected makeDynamicRoutes() {
        const routes = this.makeDynicRouteList();
        DynamicRouteBuilder.build(routes, this.userController, this.router);
    }
    private makeDynicRouteList(): IRouteConfig[] {
        const routes: IRouteConfig[] = [
            {
                methods: ["get"],
                path: '/' + this.basePath + '/',
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.userController.getAllUsers
            },
            {
                methods: ["post"],
                path: '/' + this.basePath + '/create',
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.userController.createUser
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + '/me',
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.userController.checkUserValidity
            },
            {
                methods: ["get"],
                path: '/' + this.basePath + `/:userId`,
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.userController.getUserById
            },
            {
                methods: ["put"],
                path: '/' + this.basePath + `/:userId`,
                middleWares: [AuthenticationCheck.authenticate],
                validators: [],
                handler: this.userController.updateUser
            },

        ]
        return routes;
    }
    protected initializeRoutes(): void {
        this.makeDynamicRoutes();
    }

}