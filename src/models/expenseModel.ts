import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import { User } from './userModel';

export class Expense extends Model {
  public id!: number;
  public userId!: number;
  public category!: string;
  public amount!: number;
  public date!: Date;
}

Expense.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Expense',
});

// Definir la relación entre User y Expense
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });
