import { Component } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ModalController } from '@ionic/angular';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  expenses: Expense[] = [];

  constructor(private modalCtrl: ModalController) { }

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
        budgetItems: [
          { id: 1, description: 'Groceries', amount: 300 },
          { id: 2, description: 'Transport', amount: 100 },
          { id: 3, description: 'Entertainment', amount: 150 }
        ]
      }
    }).then(modal => {
      modal.present();

      modal.onDidDismiss().then(result => {
        if (result.data) {
          this.expenses.push(result.data);

          console.log('Expense added:', result.data);
        }
      });
    });
  }

}
