import { Component, signal, inject } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import type { RegisterData } from '../../../api/auth/auth.models';
import { isValidEmail } from '../email.validation';

@Component({
  selector: 'app-register',
  styleUrl: '../auth-form.css',
  templateUrl: './register.html',
  imports: [FormField],
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((visible) => !visible);
  }

  // alle inputfelder für das register form
  registerModel = signal<RegisterData>({
    givenName: '',
    familyName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  registerForm = form(this.registerModel);
  registerError = signal('');
  submitting = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.registerError.set('');

    const credentials = this.registerModel();

    if (!credentials.email || !credentials.password || !credentials.passwordConfirmation) {
      this.registerError.set('Bitte E-Mail und Passwort eingeben.');
      return;
    }

    if (!isValidEmail(credentials.email)) {
      this.registerError.set('Ungültige E-Mail.');
      return;
    }

    if (credentials.password !== credentials.passwordConfirmation) {
      this.registerError.set('Passwörter stimmen nicht überein.');
      return;
    }
    // else (wenn alles stimmt)
    this.registerError.set('');
    this.submitting.set(true);
    this.authService
      .register({
        //der server erwartet nur diese 4 und kein passwordConfirmation
        givenName: credentials.givenName,
        familyName: credentials.familyName,
        email: credentials.email,
        password: credentials.password,
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.submitting.set(false);
          this.registerError.set(err.error?.error ?? 'Fehler beim Registrieren.');
        },
      });
  }
}
