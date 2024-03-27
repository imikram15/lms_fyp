import { Component } from '@angular/core';

@Component({
  selector: 'app-add-single',
  templateUrl: './add-single.component.html',
  styleUrl: './add-single.component.scss'
})
export class AddSingleComponent {
  classes: any[]; // Your classes data
  sections: any[]; // Your sections data

  constructor() {
    // Initialize classes and sections with dummy data
    this.classes = [
      { id: 1, name: 'Class A' },
      { id: 2, name: 'Class B' },
      { id: 3, name: 'Class C' }
    ];
    this.sections = [
      { id: 1, name: 'Section A' },
      { id: 2, name: 'Section B' },
      { id: 3, name: 'Section C' }
    ];
  }

  ngOnInit() {
    // Initialize any other data or perform any initial setup here
  }

  createSingleInvoice() {
    // Logic to create mass invoice
    console.log('Creating mass invoice...');
  }
}
