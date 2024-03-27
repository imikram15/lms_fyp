import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-promtions',
  templateUrl: './promtions.component.html',
  styleUrl: './promtions.component.scss'
})
export class PromtionsComponent {
  showTable: boolean = false;
  students: any[] = [
    { image: 'image1.jpg', name: 'John Doe', section: 'A', status: 'Promoted', nextClass: 'Class 5', previousClass: 'Class 4' },
    { image: 'image2.jpg', name: 'Jane Smith', section: 'B', status: 'Not Promoted', nextClass: 'Class 6', previousClass: 'Class 5' },
    // Add more student data as needed
  ];
  
  currentSessions: string[] = ['2023-2024', '2024-2025', '2025-2026']; // Example current session data
  sessions: string[] = ['2021-2022', '2022-2023', '2023-2024']; // Example session data
  classes: string[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6']; // Example class data
  
  promotionForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.promotionForm = this.formBuilder.group({
      currentSession: [''],
      sessionFrom: [''],
      promotingFrom: [''],
      promotingTo: ['']
    });
  }
  
  toggleTable() {
    this.showTable = !this.showTable; // Toggle the table visibility
  }

  enrollToNextClass(student: any) {
    // Implement enrollment to next class logic
  }

  enrollToPreviousClass(student: any) {
    // Implement enrollment to previous class logic
  }
}
