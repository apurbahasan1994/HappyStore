import { Router } from 'express';

export abstract class BaseRoute {
  protected router: Router;
  protected abstract basePath: string;
  protected abstract initializeRoutes(): void;
  protected abstract makeDynamicRoutes(): void;
  constructor(router: Router) {
    this.router = router;
  }
  public registerRoutes(): string {
    this.initializeRoutes();
    return this.basePath;
  }
}
