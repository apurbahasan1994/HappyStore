import User from "../Models/User";
import { UserService } from "../Services/User/UserService";

export class UserRequestHandler {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async getAllUsers(){
        try{
            const users = this.userService.getAllUsers();
            return users;
        }
        catch(e){

        }
    }

    public async createUser(userData: Partial<User>): Promise<User | null> {
        try {
            const user: User = await this.userService.createUser(userData);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            const user: User = await this.userService.getUserById(id);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async updateUser(id: string, updatedUser: Partial<User>): Promise<User | null> {
        try {
            const user = await this.userService.updateUser(id, updatedUser);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async deleteUser(id: string): Promise<boolean | null> {
        try {
            const deleted = await this.userService.deleteUser(id);
            return deleted;
        }
        catch (e) {
            throw e;
        }
    }
}