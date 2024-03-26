import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-promtions',
  templateUrl: './promtions.component.html',
  styleUrl: './promtions.component.scss'
})
export class PromtionsComponent {
  promotionForm: FormGroup;

  currentSessions: string[] = ['2022-2023', '2023-2024', '2024-2025']; // Example data, replace with actual values
  sessions: string[] = ['2021-2022', '2022-2023', '2023-2024', '2024-2025']; // Example data, replace with actual values
  classes: string[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4']; // Example data, replace with actual values

  constructor(private formBuilder: FormBuilder) {
    this.promotionForm = this.formBuilder.group({
      currentSession: [''],
      sessionFrom: [''],
      promotingFrom: [''],
      promotingTo: ['']
    });
  }
}
