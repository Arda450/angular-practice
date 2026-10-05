export interface PlannedExercise {
  name: string;
  detail: string;
}

export interface TrainingDayPlan {
  title: string;
  subtitle: string;
  exercises: PlannedExercise[];
  restDay?: boolean;
}

/** Wochenplan (0 = Sonntag … 6 = Samstag) – später aus API/DB. */
const WEEKLY_PLAN: Record<number, TrainingDayPlan> = {
  0: {
    title: 'Erholung',
    subtitle: 'Spaziergang oder leichte Mobilität',
    exercises: [],
    restDay: true,
  },
  1: {
    title: 'Push',
    subtitle: 'Brust · Schulter · Trizeps',
    exercises: [
      { name: 'Bankdrücken', detail: '4 × 8' },
      { name: 'Schulterdrücken', detail: '3 × 10' },
      { name: 'Seitheben', detail: '3 × 12' },
      { name: 'Trizeps-Drücken', detail: '3 × 12' },
    ],
  },
  2: {
    title: 'Pull',
    subtitle: 'Rücken · Bizeps',
    exercises: [
      { name: 'Klimmzüge / Latzug', detail: '4 × 8' },
      { name: 'Rudern', detail: '3 × 10' },
      { name: 'Face Pulls', detail: '3 × 15' },
      { name: 'Bizeps-Curls', detail: '3 × 12' },
    ],
  },
  3: {
    title: 'Beine',
    subtitle: 'Quadrizeps · Gesäß · Waden',
    exercises: [
      { name: 'Kniebeugen', detail: '4 × 6' },
      { name: 'Beinpresse', detail: '3 × 10' },
      { name: 'RDL', detail: '3 × 10' },
      { name: 'Wadenheben', detail: '4 × 15' },
    ],
  },
  4: {
    title: 'Oberkörper',
    subtitle: 'Ganzkörper · Intensität mittel',
    exercises: [
      { name: 'Kettlebell Swings', detail: '4 × 15' },
      { name: 'Liegestütze', detail: '3 × max' },
      { name: 'Plank', detail: '3 × 45 s' },
    ],
  },
  5: {
    title: 'Cardio & Core',
    subtitle: 'Ausdauer · Rumpf',
    exercises: [
      { name: 'Laufen / Rad', detail: '30 min Z2' },
      { name: 'Russian Twists', detail: '3 × 20' },
      { name: 'Dead Bug', detail: '3 × 12' },
    ],
  },
  6: {
    title: 'Erholung',
    subtitle: 'Stretching & leichte Aktivität',
    exercises: [{ name: 'Yoga / Mobility', detail: '20–30 min' }],
    restDay: true,
  },
};

export function planForDate(date: Date): TrainingDayPlan {
  return WEEKLY_PLAN[date.getDay()];
}

export function isWorkoutDay(date: Date): boolean {
  const plan = planForDate(date);
  return !plan.restDay && plan.exercises.length > 0;
}

export function formatPlanDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}
