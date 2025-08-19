import { Component } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ModalController, ToastController } from '@ionic/angular';
import { ExpenseComponent } from '../expense/expense.component';
import { BudgetItem } from '../models/budget.item.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  expenses: Expense[] = [];

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  addExpense() {
    this.modalCtrl.create({
      component: ExpenseComponent,
      componentProps: {
        expense: {
          id: Date.now(),
          description: '',
          amount: 0,
          date: new Date()
        },
        budgetItems: this.getBudgetItems()
      }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          this.expenses.push(result.data);

          this.toastCtrl.create({
            message: 'Expense added successfully!',
            duration: 2000,
            position: 'bottom'
          }).then(toast => toast.present());
        }
      });
    });
  }

  viewExpense(expense: Expense) {
    this.modalCtrl.create({
      component: ExpenseComponent,
      componentProps: { expense, budgetItems: this.getBudgetItems() }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          const index = this.expenses.findIndex(e => e.id === expense.id);
          if (index > -1) {
            this.expenses[index] = result.data;
          }
        }
      });
    });
  }

  getBudgetItems(): BudgetItem[] {
    return [
          { id: 1, description: 'Groceries', amount: 300 },
          { id: 2, description: 'Transport', amount: 100 },
          { id: 3, description: 'Entertainment', amount: 150 }
        ]
  }
}

