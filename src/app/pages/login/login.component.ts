import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  passwordFieldType: string = 'password';
  showPassword: boolean = false;

  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  selectedRole:any;

  selectRole(role: string) {
    
    //  this.selectedRole = role;
    switch(role) {
      case 'Admin':
        this.loginForm.setValue({
          email: 'buttikram15@gmail.com',
          password: '12341234',
          rememberMe: false
        });
        break;
         case 'Teacher':
        this.loginForm.setValue({
          email: 'teacher1@gmail.com',
          password: '12345678',
          rememberMe: false
        });
        break;
         case 'Student':
        this.loginForm.setValue({
          email: 'student1@gmail.com',
          password: '12345678',
          rememberMe: false
        });
        break;
         case 'Employee':
        this.loginForm.setValue({
          email: 'employee1@gmail.com',
          password: '12345678',
          rememberMe: false
        });
        break;
        default:
          break;
      }
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
          localStorage.setItem('auth_email', email);
        }
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'] 
        });
        this.router.navigate(['/dashboard']);
      }
    },  error => {
      this.snackBar.open('Login failed. Please check your credentials and try again.', 'Close', {
        duration: 5000, 
        panelClass: ['error-snackbar'] 
      });
      console.error('Login failed', error);
    });
  }

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }


}
