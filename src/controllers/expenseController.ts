import { Request, Response } from 'express';
import { Expense } from '../models/expenseModel';
import { Op } from 'sequelize';
import { User } from '../models/userModel'

interface AuthRequest extends Request {
    user?: User;
  }
  
export const createExpense = async (req: AuthRequest, res: Response) => {
  const { category, amount, date } = req.body;
  const expense = await Expense.create({ category, amount, date, userId: (req.user as {id: number}).id });
  res.status(201).json(expense);
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
    const { startDate, endDate } = req.query;
  
    const where: any = { userId: (req.user as { id: number }).id };
  
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
      };
    } else if (startDate) {
      where.date = {
        [Op.gte]: new Date(startDate as string),
      };
    } else if (endDate) {
      where.date = {
        [Op.lte]: new Date(endDate as string),
      };
    }
  
    try {
      const expenses = await Expense.findAll({ where });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving expenses', error });
    }
  };

export const updateExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);
  if (expense && expense.userId === (req.user as {id: number}).id) {
    await expense.update(req.body);
    res.json(expense);
  } else {
    res.status(404).json({ message: 'Expense not found or unauthorized' });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findByPk(id);
  if (expense && expense.userId === (req.user as {id: number}).id) {
    await expense.destroy();
    res.json({ message: 'Expense deleted' });
  } else {
    res.status(404).json({ message: 'Expense not found or unauthorized' });
  }
};
