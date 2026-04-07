import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { ResetPassword } from './reset-password/reset-password';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];