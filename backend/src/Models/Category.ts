import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';

interface CategoryAttributes {
    id: number;
    name: string;
    color?: string;
    image?: string;
    icon?: string;
}
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> { }
class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'categories',
        sequelize,
    }
);

export default Category;
