import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../Utils/Configurations/DatabaseConfig';

class ProductCategory extends Model {

}

ProductCategory.init(
  {
  },
  {
    sequelize,
    modelName: 'ProductCategory',
  }
);
export default ProductCategory;
