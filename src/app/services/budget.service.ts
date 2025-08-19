import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Budget } from '../models/budget.model';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private _storage: Storage | null = null;
  private ACTIVE_BUDGET_KEY = 'activeBudgetKey';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const store = await this.storage.create();
    this._storage = store;
  }

  async setActiveBudgetKey(key: string) {
    if (!this._storage) {
      await this.init();
    }

    await this._storage?.set(this.ACTIVE_BUDGET_KEY, key);
  }

  async getActiveBudgetKey(): Promise<string | null> {
    if (!this._storage) {
      await this.init();
    }

    return this._storage?.get(this.ACTIVE_BUDGET_KEY);
  }

  async getActiveBudget(): Promise<Budget | null> {
    const activeBudgetKey = await this.getActiveBudgetKey();
    if (!activeBudgetKey) return null;

    return this._storage?.get(`budget_${activeBudgetKey}`);
  }

  async saveActiveBudget(budget: Budget) {
    const activeBudgetKey = await this.getActiveBudgetKey();
    if (!activeBudgetKey) return;

    await this._storage?.set(`budget_${activeBudgetKey}`, budget);
  }
}
