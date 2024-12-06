import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ServiceService} from '../../service.service';
import { Chart, ArcElement, CategoryScale, Title, Tooltip, Legend, PieController } from 'chart.js';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  expenses: any[] = [];
  chart: any;
  id: any = localStorage.getItem('id');
  totalExpenses: number = 0;
  remainingBudget: number = 0;

  constructor(private appService : ServiceService) {
  }

  ngOnInit() {
    Chart.register(ArcElement, CategoryScale, Title, Tooltip, Legend, PieController);
    this.getExpenses();
    this.loadChart();
  }

  getExpenses() {
    this.appService.getExpenses(this.id).subscribe((data: any) => {
      this.expenses = data.expenses;
      this.totalExpenses = data.totalExpense;
    });
  }

  loadChart() {
    this.appService.chartExpenses(this.id)
      .subscribe((data: any) => {
        const categories = data.map((d: any) => d.category);
        const totals = data.map((d: any) => d.totalAmount);

        const canvas: HTMLCanvasElement = document.getElementById('expenseChart') as HTMLCanvasElement;
        canvas.width = 50;   // Set width of the chart
        canvas.height = 30;  // Set height of the chart

        if (this.chart) this.chart.destroy();
        this.chart = new Chart('expenseChart', {
          type: 'pie',
          data: {
            labels: categories,
            datasets: [
              {
                data: totals,
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
                  '#4bc0c0', '#9966ff', '#ff9f40', '#ffcd56',
                  '#2ecc71', '#3498db', '#9b59b6', '#e74c3c'  ],
              },
            ],
          },
        });
      });
  }
}
