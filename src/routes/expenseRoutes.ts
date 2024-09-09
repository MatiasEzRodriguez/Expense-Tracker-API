import { Router } from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

export default router;
