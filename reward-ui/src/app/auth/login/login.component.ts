// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validates a 10-digit phone number
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { phone, password } = this.loginForm.value;
      this.authService.login(phone, password).subscribe(
        response => {
          this.errorMessage = '';
          // Navigate to the business page after a successful login
          this.router.navigate(['/business']);
        },
        error => {
          // Show an error message if the login fails
          this.errorMessage = 'Login failed. Please check your phone number and password.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
