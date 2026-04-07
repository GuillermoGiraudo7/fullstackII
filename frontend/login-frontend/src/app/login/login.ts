import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ResetPassword } from '../reset-password/reset-password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ResetPassword
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;

  loading = signal(false);
  error = signal('');
  showReset = signal(false);

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

 onLogin() {
  console.log("🔥 LOGIN CLICK");

  if (this.loginForm.invalid) {
    console.log("❌ FORM INVALIDO", this.loginForm.value);
    return;
  }

  this.loading.set(true);

  const { username, password, remember } = this.loginForm.value;

  console.log("📡 ENVIANDO LOGIN:", username, password);

  this.http.post<any>('http://127.0.0.1:8000/api/login/', { username, password })
    .subscribe({
      next: res => {
        console.log("✅ LOGIN OK", res);

        if (remember) {
          localStorage.setItem('access_token', res.access);
        } else {
          sessionStorage.setItem('access_token', res.access);
        }

        this.router.navigate(['/home']);
        this.loading.set(false);
      },
      error: err => {
        console.log("❌ ERROR LOGIN", err);
        this.error.set('Error de login');
        this.loading.set(false);
      }
    });
}
  openReset() {
    this.showReset.set(true);
  }
}
