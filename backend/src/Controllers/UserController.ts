import { NextFunction, Request, Response } from "express";
import { ICreateUser } from "../RequstDto/UserDto";
import { EntityFieldValidator } from "../Validators/EntityValidator";
import { requiredUserCreateFields } from "../Constants/Constants";
import { UserRequestHandler } from "../RequestHandlers/UserRequstHandler";
import { BaseController } from "../BaseModels/BaseController";

export interface IUserController {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    createUser(req: Request, res: Response, next: NextFunction): void;
    getUserById(req: Request, res: Response, next: NextFunction): void;
    updateUser(req: Request, res: Response, next: NextFunction): void;
    deleteUser(req: Request, res: Response, next: NextFunction): void;
  }
  

export class UserController extends BaseController implements IUserController{
    private userRequestHandler: UserRequestHandler;

    constructor() {
        super();
        this.userRequestHandler = new UserRequestHandler();
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {

        try {
            const users = await this.userRequestHandler.getAllUsers();
            res.status(201).json({ users: users });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create user' });
            next(error);
        }

    }

    public createUser(req: Request, res: Response, next: NextFunction): void {
        if (EntityFieldValidator.isRequireFieldExist(req.body, requiredUserCreateFields)) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const { name,
            email,
            street,
            house,
            password,
            zip,
            city,
            country,
            phone,
            mobile,
            isAdmin } = req.body;

        const newUser: ICreateUser = {
            name,
            email,
            password,
            zip,
            city,
            country,
            mobile,
            phone,
            house,
            street
        };

        try {
            const createdUser = this.userRequestHandler.createUser(newUser);
            res.status(201).json({ user: createdUser });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create user' });
            next(error);
        }
    }

    public getUserById(req: Request, res: Response, next: NextFunction): void {
        const userId: string = req.params.id;

        try {
            const user = this.userRequestHandler.getUserById(userId);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user' });
            next(error);
        }
    }

    public updateUser(req: Request, res: Response, next: NextFunction): void {
        if (EntityFieldValidator.isRequireFieldExist(req.body, requiredUserCreateFields)) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const userId: string = req.params.id;
        const { name,
            email,
            street,
            house,
            password,
            zip,
            city,
            country,
            phone,
            mobile, } = req.body;
        const updatedUser: ICreateUser = {
            name,
            email,
            password,
            zip,
            city,
            country,
            mobile,
            phone,
            house,
            street
        };

        try {
            const user = this.userRequestHandler.updateUser(userId, updatedUser);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user' });
            next(error);
        }
    }

    public deleteUser(req: Request, res: Response, next: NextFunction): void {
        const userId: string = req.params.id;

        try {
            const deletedUser = this.userRequestHandler.deleteUser(userId);

            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user' });
            next(error);
        }
    }
}