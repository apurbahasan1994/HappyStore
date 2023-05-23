import { RequestHandler } from 'express';

export interface IRouteConfig {
    methods: string[];
    path: string;
    middleWares: RequestHandler<any>[];
    validators: RequestHandler<any>[];
    handler: RequestHandler<any>;
}