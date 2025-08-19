import { BudgetItem } from "./budget.item.model";
import { Expense } from "./expense.model";

export interface Budget {
    id: number;
    name: string;
    total: number;
    budgetItems: BudgetItem[];
    expenses: Expense[];
    startDate: Date;
    endDate: Date;

}