import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';
interface OrderItemAttributes {
    id: number;
    orderId: number;
    productId: number;
    customerId:number;
    quantity: number;
  }
  
  interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> { }
  
  class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
    public id!: number;
    public orderId!: number;
    public productId!: number;
    public customerId!:number;
    public quantity!: number;
  
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'order_items',
      sequelize,
    }
  );

  export default OrderItem;