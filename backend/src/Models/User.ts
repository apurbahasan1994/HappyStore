import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    passwordHash: string;
    street?: string;
    house?: string;
    zip?: string;
    city?: string;
    country: string;
    phone?: string;
    mobile: string;
    isAdmin: boolean;
}
interface CategoryCreationAttributes extends Optional<UserAttributes, 'id'> { }
class User extends Model<UserAttributes, CategoryCreationAttributes> implements UserAttributes {
    public id!: number;
    firstName: string;
    lastName?: string;
    email: string;
    passwordHash: string;
    street?: string;
    house?: string;
    zip?: string;
    city?: string;
    country: string;
    phone?: string;
    mobile: string;
    isAdmin: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public static async getAllUsers() {
        const users = await User.findAll({
            attributes: {
                exclude: ['passwordHash']
            }
        });
        return users;
    }

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true
    },
    house: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:false,
    }
},

    {
        tableName: 'users',
        sequelize,
    }
);

export default User;
