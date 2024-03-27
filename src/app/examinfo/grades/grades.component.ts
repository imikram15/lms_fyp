import { Component } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent {
  grades: any[] = [
    { grade: 'A', gradePoint: '4.00', markFrom: 80, markUpto: 100 },
    { grade: 'B', gradePoint: '3.00', markFrom: 70, markUpto: 79 },
    // Add more grades as needed
  ];
}
