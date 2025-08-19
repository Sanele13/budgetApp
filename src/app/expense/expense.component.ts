import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Expense } from '../models/expense.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetItem } from '../models/budget.item.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  expense: Expense | undefined;
  budgetItems: BudgetItem[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('ExpenseComponent initialized with expense:', this.expense);
  }

  cancel() {
    return this.modalCtrl.dismiss(null);
  }

  confirm() {
    return this.modalCtrl.dismiss(this.expense);
  }

}
