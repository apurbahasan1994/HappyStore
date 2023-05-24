import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';


interface OrderAttributes {
  id: number;
  city: string;
  zip: string;
  country: string;
  phone?: string;
  mobile: string;
  status: string;
  totalPrice: string;
  dateOrdered: Date;
  shippingAddress1?: string;
  shippingAddress2?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id: number;
  public city: string;
  public zip: string;
  public country: string;
  public phone: string;
  public mobile: string;
  public status: string;
  public totalPrice: string;
  public dateOrdered: Date;
  public shippingAddress1: string;
  public shippingAddress2: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOrdered: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shippingAddress1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingAddress2: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'orders',
    sequelize,
  }
);


export default Order;
