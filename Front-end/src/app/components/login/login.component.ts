import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../../service.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  addForm: { username?: string; password?: string } = {}; // Add appropriate type
  errorMessage: string | null = null;

  constructor(private appService: ServiceService, private router: Router) {}

  ngOnInit(): void {
  }

  loginUser(): void {
    if (!this.addForm.username || !this.addForm.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.appService
      .login(this.addForm)
      .subscribe(
        (response: any) => {
          this.errorMessage = null; // Clear error message
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.userId);

          console.log('Token:', response.token);
          console.log('User ID:', response.userId);

          // Navigate after successful login
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error occurred during login:', error);
          this.errorMessage = 'Invalid username or password. Please try again.';
        }
      );
  }

}
