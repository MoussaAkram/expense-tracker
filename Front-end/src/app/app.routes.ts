import {RouterModule, Routes} from '@angular/router';
import {ExpensesComponent} from './components/expenses/expenses.component';
import {NgModule} from '@angular/core';
import {AddExpensesComponent} from './components/add-expenses/add-expenses.component';
import {BudgetComponent} from './components/budget/budget.component';
import {ChartComponent} from './components/chart/chart.component';
import {authGuard} from './auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ExpensesComponent, canActivate: [authGuard]},
  { path: 'add', component: AddExpensesComponent, canActivate: [authGuard]},
  { path: 'budget', component: BudgetComponent, canActivate: [authGuard]},
  { path: 'chart', component: ChartComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
