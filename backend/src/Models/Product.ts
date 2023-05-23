import { Model, DataTypes, Optional, BelongsTo, BelongsToMany, HasManySetAssociationsMixin } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';
import Category from './Category';
import ProductCategory from './ProductCategory';

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  countInStock?: number;
  rating?: number;
  isFeatured?: boolean;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description?: string;
  public richDescription?: string;
  public image?: string;
  public images?: string[];
  public brand?: string;
  public countInStock?: number;
  public rating?: number;
  public isFeatured?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  declare setCategories: HasManySetAssociationsMixin<Category, number>;

}

Product.init(
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    richDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.TEXT, // Use TEXT data type for storing JSON-encoded string
      allowNull: true,
      get() {
        const imagesString = this.getDataValue('images') || [];
        let imageData = [];
        imagesString.forEach(image => {
          imageData.push(JSON.stringify(image))
        })
        return imageData;
      },
      set(images: string[]) {
        let imageData = [];
        images.forEach(image => {
          imageData.push(JSON.stringify(image))
        })
        this.setDataValue('images', imageData);
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
  },
  {
    tableName: 'products',
    sequelize,
  }
);

export default Product;