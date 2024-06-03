import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    
    const { email, password, rememberMe } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe(response => {
      if (response.data.token) {
        if (rememberMe) {
          // Remember user
          localStorage.setItem('auth_email', email);
        }
        this.router.navigate(['/dashboard']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
