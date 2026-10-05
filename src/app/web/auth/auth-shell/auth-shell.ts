import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';

@Component({
  selector: 'app-auth-shell',
  templateUrl: './auth-shell.html',
  styleUrl: '../auth-form.css',
  standalone: true,
  imports: [MatTabsModule, LoginComponent, RegisterComponent],
})
export class AuthShellComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private sub?: { unsubscribe(): void };
  selectedIndex = signal(0);

  ngOnInit() {
    this.syncTabFromUrl(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.syncTabFromUrl(this.router.url));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onTabChange(index: number) {
    this.selectedIndex.set(index);
    void this.router.navigate([index === 0 ? 'login' : 'register']);
  }

  private syncTabFromUrl(url: string) {
    this.selectedIndex.set(url.includes('register') ? 1 : 0);
  }
}
