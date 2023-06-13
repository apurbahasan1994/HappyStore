import { emit } from "process";
import { hashingSalt } from "../../Constants/Constants";
import PasswordToken from "../../Models/PasswordResetToken";
import User, { UserAttributes } from "../../Models/User";
import { AuthUtil } from "../../Utils/AuthUtils";

export class UserRepository {

    /**
  * Get all users.
  *
  * @returns {Promise<User[]>} - A promise that resolves to an array of all users.
  * @throws {Error} - If an error occurs while fetching the users.
  */
    public async getAllUsers(): Promise<User[]> {
        try {
            const users = await User.getAllUsers();
            return users;
        } catch (e) {
            throw new Error(`Failed to get users`);
        }
    }

    /**
     * Create a new user.
     *
     * @param {Partial<User>} user - The user data.
     * @returns {Promise<User | null>} - A promise that resolves to the created user or null if the creation fails.
     * @throws {Error} - If an error occurs while creating the user.
     */
    public async createUser(user: Partial<User>): Promise<User | null> {
        try {
            user.passwordHash = await AuthUtil.hashedPassWord(user.passwordHash, hashingSalt);
            const newUser: User = await User.create(user);
            return newUser;
        } catch (e) {
            throw new Error(`Failed to create user`);
        }
    }

    /**
     * Get a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<User | null>} - A promise that resolves to the user with the specified ID or null if the user is not found.
     * @throws {Error} - If an error occurs while fetching the user.
     */
    public async getUserById(id: string): Promise<User | null> {
        try {
            const user: User = await User.findOne({
                where: { id: +id },
                attributes: {
                    exclude: ['passwordHash']
                }
            });
            return user;
        } catch (e) {
            throw new Error(`Failed to get the user with id = ${id}`);
        }
    }

    /**
     * Get the password hash for a user by email.
     *
     * @param {string} email - The email address of the user.
     * @returns {Promise<string>} - A promise that resolves to the password hash of the user.
     * @throws {Error} - If an error occurs while fetching the user's password hash.
     */
    public async getUserPassWord(email: string): Promise<string> {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
            return user.dataValues.passwordHash;
        } catch (e) {
            throw new Error('Could not find user with that email');
        }
    }

    /**
     * Get a password reset token by token value.
     *
     * @param {string} token - The token value.
     * @returns {Promise<any>} - A promise that resolves to the password reset token.
     * @throws {Error} - If an error occurs while fetching the token.
     */
    public async getToken(token: string): Promise<any> {
        try {
            const resetToken = await PasswordToken.findOne({
                where: {
                    token: token,
                },
            });
            return resetToken.dataValues;
        } catch (e) {
            throw new Error('Invalid token');
        }
    }

    /**
     * Get a user by email address.
     *
     * @param {string} email - The email address of the user.
     * @returns {Promise<User | null>} - A promise that resolves to the user with the specified email or null if the user is not found.
     * @throws {Error} - If an error occurs while fetching the user.
     */
    public async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                },
                attributes: {
                    exclude: ['passwordHash']
                }
            });
            return user;
        } catch (e) {
            throw new Error('Could not find user with that email');
        }
    }

    /**
     * Update a user by ID.
     *
     * @param {number} id - The ID of the user.
     * @param {Partial<User>} updatedUser - The updated user data.
     * @returns {Promise<User | null>} - A promise that resolves to the updated user or null if the user is not found.
     * @throws {Error} - If an error occurs while updating the user.
     */
    public async updateUser(id: number, updatedUser: Partial<User>): Promise<User | null> {
        try {
            const user = await this.getUserById(id.toString());
            if (user) {
                const updatedUserEntry: User = await user.update(updatedUser);
                return updatedUserEntry;
            }
            return null;
        } catch (e) {
            throw new Error(`Could not update the user with id=${id}`);
        }
    }

    /**
     * Update a user by email address.
     *
     * @param {string} email - The email address of the user.
     * @param {Partial<UserAttributes>} updatedUser - The updated user data.
     * @returns {Promise<any>} - A promise that resolves to the updated user or null if the user is not found.
     * @throws {Error} - If an error occurs while updating the user.
     */
    public async updateUserByEmail(email: string, updatedUser: Partial<UserAttributes>): Promise<any> {
        try {
            const user = await this.getUserByEmail(email);
            if (user) {
                const updatedUserEntry: User = await user.update({ passwordHash: updatedUser.passwordHash });
                return updatedUserEntry;
            }
            return null;
        } catch (e) {
            throw new Error(`Could not update the user with email=${email}`);
        }
    }

    /**
     * Delete a user by ID.
     *
     * @param {string} id - The ID of the user.
     * @returns {Promise<boolean | null>} - A promise that resolves to true if the user is successfully deleted, or null if the user is not found.
     * @throws {Error} - If an error occurs while deleting the user.
     */
    public async deleteUser(id: string): Promise<boolean | null> {
        try {
            const user: User = await User.findByPk(id);
            if (user) {
                await user.destroy();
                return true;
            }
        } catch (e) {
            throw new Error(`Could not delete the user with id=${id}`);
        }
    }

}
