import { Injectable } from '@angular/core';
import {environment} from '../environments/environment.development';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.BaseUrl
  private loggedIn = false;

  constructor(private http : HttpClient , public router: Router) {
  }

  getExpenses(id: number | undefined): Observable<any[]> {
    const url = `${this.apiUrl}/Expense/user/${id}`
    return this.http.get<any[]>(url)
  }

  addExpenses(expense : any) : Observable<any> {
    const url = `${this.apiUrl}/Expense`;
    return this.http.post(url, expense)
  }

  deleteExpense(id: number) {
    const url = `${this.apiUrl}/Expense/${id}`
    return this.http.delete(url)
  }

  setMonthlyBudget(budget : any) :Observable<any> {
    const url = `${this.apiUrl}/Budget`
    return this.http.post(url, budget)
  }

  updateBudgetProgress(id: number) : Observable<any> {
    const url = `${this.apiUrl}/Budget/remaining-budget/user/${id}`
    return this.http.get<any>(url)
  }
  getBudget(id: number): Observable<any> {
    const url = `${this.apiUrl}/Budget/user/${id}`;
    return this.http.get(url)
  }

  chartExpenses(id : number): Observable<any> {
    const url = `${this.apiUrl}/Expense/expense-chart/${id}`;
    return this.http.get(url)
  }

  register(user: any) : Observable<any> {
    const url = `${this.apiUrl}/Auth/register`;
    return this.http.post(url, user)
  }

  login(user: any): Observable<any> {
    const url = `${this.apiUrl}/Auth/login`;
    this.loggedIn = true;
    return this.http.post(url, user);
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    this.loggedIn = false;
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
