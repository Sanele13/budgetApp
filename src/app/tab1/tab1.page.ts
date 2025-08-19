import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ModalController, ToastController } from '@ionic/angular';
import { ExpenseComponent } from '../expense/expense.component';
import { BudgetItem } from '../models/budget.item.model';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  expenses: Expense[] = [];
  budget: Budget | undefined;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    // Load expenses from storage
    this.budgetService.getActiveBudget().then(budget => {
      this.expenses = budget?.expenses || [];
    });
  }

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

          if (this.budget) {
            this.budget.expenses = this.expenses;

            this.budgetService.saveActiveBudget(this.budget).then(() => {
              this.toastCtrl.create({
                message: 'Expense added successfully!',
                duration: 2000,
                position: 'bottom'
              }).then(toast => toast.present());
            });
          }

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
    return this.budget?.budgetItems || [];
  }
}