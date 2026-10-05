import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthShellComponent } from './auth/auth-shell/auth-shell';
import { AuthService } from './auth/auth.service';
import { LandingPage } from './protected/landing-page';

// authguard ist nur für die landing-page, um zu prüfen, ob der user eingeloggt ist per auth/me
const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.me().pipe(
    map(() => true), // zugriff erlaubt für login
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthShellComponent },
  { path: 'register', component: AuthShellComponent },
  { path: 'protected/landing-page', component: LandingPage, canActivate: [authGuard] },
];
