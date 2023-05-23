import User from "../../Models/User";
import { AuthUtil } from "../../Utils/AuthUtils";

export class UserRepository {


    public async getAllUsers() {
        try {
            const users = User.getAllUsers();
            return users;
        }
        catch (e) {
            throw new Error(`Failed to get users`);
        }
    }


    public async createUser(user: Partial<User>): Promise<User | null> {
        try {
            user.passwordHash = await AuthUtil.hashedAPssWord(user.passwordHash, 10);
            const newUser: User = await User.create(user);
            return newUser;
        }
        catch (e) {
            throw new Error(`Failed to create user`);
        }
    }

    public async getUserById(id: string): Promise<User | null> {
        try {
            const user: User = await User.findOne({ where: { id: id } });
            return user;
        }
        catch (e) {
            throw new Error(`Failed to get the user with id = ${id}`);
        }
    }

    public async getUserByEmail(email: string) {

        try {
            const user = await User.findOne({
                where: {
                    email: email,
                }
                ,
                attributes: {
                    exclude: ['passwordHash']
                }
            });
            return user;
        }
        catch (e) {
            throw new Error('Could not find user with that email')
        }

    }

    public async updateUser(id: string, updatedUser: Partial<User>): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            if (user) {
                const updatedUserEntry: User = await user.update(updatedUser);
                return updatedUserEntry;
            }
            return null
        }
        catch (e) {
            throw new Error(`Could not update the user with id=${id}`)
        }
    }

    public async deleteUser(id: string): Promise<boolean | null> {
        try {
            const user: User = await User.findByPk(id);
            if (user) {
                await user.destroy();
                return true;
            }
        }
        catch (e) {
            throw new Error(`Could not delete the user with id=${id}`)
        }
    }

}
