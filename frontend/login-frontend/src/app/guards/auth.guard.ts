import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // 🔥 Ahora busca en ambos
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');

  if (token) {
    return true;
  }

  // ❌ Redirección correcta en Angular
  return router.parseUrl('/');
};