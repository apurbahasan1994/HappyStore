import Product from "../Models/Product";
import ProductCategory from "../Models/ProductCategory";
import Category from "../Models/Category";
import { sequelize } from './Configurations/DatabaseConfig'
Category.belongsToMany(Product, { through: ProductCategory });
Product.belongsToMany(Category, { through: ProductCategory });
export { sequelize };
