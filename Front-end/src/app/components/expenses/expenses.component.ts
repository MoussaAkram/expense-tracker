import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Chart} from 'chart.js';
import {NgForOf} from '@angular/common';
import {ServiceService} from '../../service.service';

@Component({
  selector: 'expenses-components',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];
  items: any[] = [];
  form: FormGroup;
  chart: any;
  id: any = localStorage.getItem('id');
  totalExpenses: number = 0;
  remainingBudget: number = 0;
  p: number = 1;
  pageSize: number = 10;

  constructor(private fb: FormBuilder, private appService : ServiceService) {
    this.form = this.fb.group({
      description: [''],
      amount: [0],
      userId: [this.id],
      category: ['Food'],
    });
  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.appService.getExpenses(this.id).subscribe((data: any) => {
      this.expenses = data.expenses;
      this.items = data.expenses;
      this.totalExpenses = data.totalExpense;
    });
  }


  deleteExpense(id: number) {
    this.appService.deleteExpense(id).subscribe(() => {
      this.getExpenses();
    });
  }

  previousPage() {
    if (this.p > 1) {
      this.p--;
    }
  }

  nextPage() {
    const totalPages = this.getTotalPages();
    if (this.p < totalPages) {
      this.p++;
    }
  }

  getTotalPages() {
    return Math.ceil(this.items.length / this.pageSize);
  }

}
