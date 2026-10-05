import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { RegisterRequest } from '../../api/auth/auth.models';

// macht einen http request vom browser zum server, also zu index.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post('/api/auth/login', { email, password });
  }

  logout() {
    return this.http.post('/api/auth/logout', {});
  }

  me() {
    return this.http.get('/api/auth/me');
  }

  register(data: RegisterRequest) {
    return this.http.post('/api/auth/register', data);
  }
}
