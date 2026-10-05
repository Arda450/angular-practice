import { Component, signal, inject } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import type { LoginData } from '../../../api/auth/auth.models';
import { isValidEmail } from '../email.validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: '../auth-form.css',
  imports: [FormField],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((visible) => !visible);
  }

  // signal speichert die loginwerte(loginData)
  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  // anhand form() können wir die inputs vom html dem model koppeln
  // form() ist die schreibbrücke zwischen html und model
  loginForm = form(this.loginModel);
  loginError = signal('');
  submitting = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.loginError.set('');

    // hier werden die inputs aus dem model für das auth ausgelesen
    const credentials = this.loginModel();
    // wenn email oder passwort fehlt, wird eine fehlermeldung angezeigt
    if (!credentials.email || !credentials.password) {
      this.loginError.set('Bitte E-Mail und Passwort eingeben.');
      return;
      fff;
    }

    if (!isValidEmail(credentials.email)) {
      this.loginError.set('Ungültige E-Mail.');
      return;
    }
    // else (wenn email und passwort vorhanden sind)
    this.submitting.set(true);
    this.authService.login(credentials.email, credentials.password).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/protected/landing-page']);
      },
      error: () => {
        this.submitting.set(false);
        this.loginError.set('Anmeldung fehlgeschlagen. Bitte Daten prüfen.');
      },
    });
  }
}
