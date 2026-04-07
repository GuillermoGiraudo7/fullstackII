import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,           // 🔥 ngIf
    ReactiveFormsModule,    // 🔥 formGroup
    HttpClientModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {
  form: FormGroup;

  otpSent = signal(false);
  loading = signal(false);
  error = signal('');
  message = signal('');

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      otp_code: [''],
      new_password: ['']
    });
  }

  requestOtp() {
     console.log("🔥 CLICK FUNCIONA"); // 👈
    const username = this.form.value.username;
    if (!username) return;

    this.loading.set(true);

    this.http.post<any>('http://127.0.0.1:8000/api/request-otp/', { username })
      .subscribe({
        next: () => {
          this.otpSent.set(true);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Error al pedir OTP');
          this.loading.set(false);
        }
      });
  }

  resetPassword() {
    const data = this.form.value;

    this.http.post<any>('http://127.0.0.1:8000/api/reset-password/', data)
      .subscribe({
        next: () => {
          this.message.set('Contraseña actualizada');
        },
        error: () => {
          this.error.set('Error al resetear');
        }
      });
  }
}