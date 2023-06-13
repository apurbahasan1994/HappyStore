import Product from "../Models/Product";
import ProductCategory from "../Models/ProductCategory";
import Category from "../Models/Category";
import Order from "../Models/Order";
import OrderItem from "../Models/OrderItem";
import { sequelize } from './Configurations/DatabaseConfig';
import User from "../Models/User";
import PasswordToken from "../Models/PasswordResetToken";
Category.belongsToMany(Product, { through: ProductCategory });
Product.belongsToMany(Category, { through: ProductCategory });
Order.belongsTo(User, {
    foreignKey: 'customerId'
});
User.hasMany(Order, {
    foreignKey: "orderId"
});
PasswordToken.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PasswordToken, { foreignKey: 'userId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.hasMany(OrderItem, {
    foreignKey: 'productId'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'productId'
});
Order.hasMany(OrderItem, {
    foreignKey: 'orderId'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'orderId'
});


export { sequelize };
