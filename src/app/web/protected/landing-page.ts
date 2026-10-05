import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth/auth.service';
import { FitnessPlanComponent } from './fitness-plan/fitness-plan';
import { TrainingCalendarComponent } from './training-calendar/training-calendar';
import { isWorkoutDay, planForDate } from './training-plan.models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  imports: [DatePipe, MatCardModule, TrainingCalendarComponent, FitnessPlanComponent],
})

// lifecycle hook
export class LandingPage implements OnInit {
  /** Für Template: Plan eines Datums anzeigen */
  protected readonly planForDate = planForDate;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // startwert von username ist Athlet, bis api antwortet
  readonly userName = signal('Athlet');
  readonly selectedDate = signal(new Date());

  ngOnInit() {
    this.authService.me().subscribe({
      next: (body: { user?: { sub?: string } }) => {
        const sub = body.user?.sub;
        if (sub) {
          this.userName.set(sub.split('@')[0] ?? sub);
        }
      },
    });
  }

  readonly todayPlan = computed(() => planForDate(new Date()));
  readonly weekProgress = computed(() => {
    const today = new Date();
    let workouts = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + i);
      if (isWorkoutDay(d)) {
        workouts++;
      }
    }
    return { done: 4, planned: workouts };
  });

  onDateChange(date: Date) {
    this.selectedDate.set(date);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
