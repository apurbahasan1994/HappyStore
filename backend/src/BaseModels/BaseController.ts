import { Request, Response } from 'express';

export abstract class BaseController {
  
  protected get(route: string, handler: (req: Request, res: Response) => void): void {
  }

  protected post(route: string, handler: (req: Request, res: Response) => void): void {
    
  }

  protected put(route: string, handler: (req: Request, res: Response) => void): void {
   
  }

  protected delete(route: string, handler: (req: Request, res: Response) => void): void {
   
  }
}
