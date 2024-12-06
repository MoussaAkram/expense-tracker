import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service.service';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit{
  expenses: any[] = [];
  id: any = localStorage.getItem('id');
  form: FormGroup;
  totalExpenses: number = 0;
  remainingBudget: number = 0;
  monthlyBudget: number= 0; // Example budget

  constructor(private fb: FormBuilder, private appService : ServiceService) {
    this.form = this.fb.group({
      amount: [0],
      userId: [this.id],
    });
  }

  ngOnInit() {
    this.updateBudgetProgress();
    this.getExpenses();
    this.getBudget();
  }


  getExpenses() {
    this.appService.getExpenses(this.id).subscribe((data: any) => {
      this.expenses = data.expenses;
      this.totalExpenses = data.totalExpense;
    });
  }
  getBudget(){
    this.appService.getBudget(this.id).subscribe((data: any) => {
      this.monthlyBudget = data.amount;
    });
  }

  updateBudgetProgress() {
    this.appService.updateBudgetProgress(this.id)
      .subscribe((data: any) => {
        this.remainingBudget = data.remainingBudget;
      });
  }

  setMonthlyBudget() {
    this.appService.setMonthlyBudget(this.form.value).subscribe({
      next: (response) => {
        console.log('Budget successfully posted:', response);

        // Refresh data
        this.getExpenses();
        this.updateBudgetProgress();
        this.monthlyBudget = response.amount

        // Reset the form
        this.form.reset({
          amount: 0,
          userId: this.id,
        });
      },
      error: (error) => {
        console.error('Error while posting budget:', error);
      }
    });
  }

}
