import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service.service';
import {Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: { username: string; email: string; password: string } = {
    username: '',
    email: '',
    password: ''
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private appService: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  registerUser(): void {
    if (!this.registerForm.username || !this.registerForm.email || !this.registerForm.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.appService
      .register(this.registerForm)
      .subscribe(
        (response: any) => {
          this.errorMessage = null; // Clear error message
          this.successMessage = 'Registration successful. You can now log in.';
          console.log('Registration Response:', response);

          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error occurred during registration:', error);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }
}
