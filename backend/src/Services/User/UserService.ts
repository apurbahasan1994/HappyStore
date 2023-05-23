import User from "../../Models/User";
import { UserRepository } from "../../Repositories/User/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async getAllUsers() {
        try {
            const users = await this.userRepository.getAllUsers();
        }
        catch (e) {
            throw e;
        }
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = this.userRepository.getUserByEmail(email)
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async createUser(userData: Partial<User>): Promise<User | null> {
        try {
            const user: User = await this.userRepository.createUser(userData);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            const user: User = await this.userRepository.getUserById(id);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async updateUser(id: string, updatedUser: Partial<User>): Promise<User | undefined> {
        try {
            const user = await this.userRepository.updateUser(id, updatedUser);
            return user;
        }
        catch (e) {
            throw e;
        }
    }

    public async deleteUser(id: string): Promise<boolean | null> {
        try {
            const deleted = await this.userRepository.deleteUser(id);
            return deleted;
        }
        catch (e) {
            throw e;
        }
    }
}