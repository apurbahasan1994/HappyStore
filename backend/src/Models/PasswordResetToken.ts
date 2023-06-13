import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';

interface PasswordTokenAttributes {
    id: number;
    token: string;
    expires_at: Date;
    userId?: number;
}
interface PasswordTokenCreationAttributes extends Optional<PasswordTokenAttributes, 'id' | 'userId'> { }
class PasswordToken extends Model<PasswordTokenAttributes, PasswordTokenCreationAttributes> implements PasswordTokenAttributes {
    id!: number;
    token: string;
    expires_at: Date;
    userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

PasswordToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    },
    {
        tableName: 'passwordtokens',
        sequelize,
    }
);

export default PasswordToken;
