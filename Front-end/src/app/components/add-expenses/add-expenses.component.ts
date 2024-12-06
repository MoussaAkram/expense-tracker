import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'app-add-expenses',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-expenses.component.html',
  styleUrl: './add-expenses.component.css'
})
export class AddExpensesComponent implements OnInit {
  expenses: any[] = [];
  form: FormGroup;
  chart: any;
  id: any = localStorage.getItem('id');
  remainingBudget: number = 0;
  totalExpenses: number = 0;


  constructor(private fb: FormBuilder, private appService : ServiceService) {
    this.form = this.fb.group({
      description: [''],
      amount: [0],
      userId: [this.id],
      category: ['Food'],
    });
  }

  ngOnInit() {
    this.updateBudgetProgress();
    this.getExpenses();
  }


  getExpenses() {
    this.appService.getExpenses(this.id).subscribe((data: any) => {
      this.expenses = data.expenses;
      this.totalExpenses = data.totalExpense;
    });
  }

  addExpense() {
    const newExpenseAmount = this.form.value.amount;
    if (newExpenseAmount > this.remainingBudget) {
      alert('Cannot add expense. It exceeds your remaining budget.');
      return;
    }

    this.appService.addExpenses(this.form.value).subscribe({
      next: () => {
        this.form.reset({
          description: '',
          amount: 0,
          userId: this.id,
          category: 'Food',
        });

        this.getExpenses();
      },
      error: (err) => {
        console.error('Error adding expense:', err);
      },
    });
  }

  updateBudgetProgress() {
    this.appService.updateBudgetProgress(this.id)
      .subscribe((data: any) => {
        this.remainingBudget = data.remainingBudget;
      });
  }

}
