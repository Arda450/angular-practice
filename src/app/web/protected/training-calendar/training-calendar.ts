import { Component, input, output } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { isWorkoutDay } from '../training-plan.models';

@Component({
  selector: 'app-training-calendar',
  standalone: true,
  imports: [MatCalendar],
  templateUrl: './training-calendar.html',
  styleUrl: './training-calendar.css',
})
export class TrainingCalendarComponent {
  selected = input.required<Date>();
  selectedChange = output<Date>();

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month' && isWorkoutDay(cellDate)) {
      return 'has-workout';
    }
    return '';
  };

  onSelected(date: Date | null) {
    if (date) {
      this.selectedChange.emit(date);
    }
  }
}
