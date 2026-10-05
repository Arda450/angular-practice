import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { formatPlanDate, planForDate } from '../training-plan.models';

@Component({
  selector: 'app-fitness-plan',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule, MatChipsModule],
  templateUrl: './fitness-plan.html',
  styleUrl: './fitness-plan.css',
})
export class FitnessPlanComponent {
  selectedDate = input.required<Date>();

  readonly heading = computed(() => formatPlanDate(this.selectedDate()));
  readonly plan = computed(() => planForDate(this.selectedDate()));
}
