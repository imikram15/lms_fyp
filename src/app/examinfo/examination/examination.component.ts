import { Component } from '@angular/core';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrl: './examination.component.scss'
})
export class ExaminationComponent {
addExam() {
throw new Error('Method not implemented.');
}
  exams: any[] = [
    { name: 'Midterm Exam', startingDate: '2024-04-01', startingWeekday: 'Friday', endingDate: '2024-04-10', endingWeekday: 'Monday' },
    { name: 'Final Exam', startingDate: '2024-05-15', startingWeekday: 'Monday', endingDate: '2024-05-30', endingWeekday: 'Wednesday' },
    { name: 'Quiz 1', startingDate: '2024-06-05', startingWeekday: 'Wednesday', endingDate: '2024-06-10', endingWeekday: 'Monday' }
];
}
