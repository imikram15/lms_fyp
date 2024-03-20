import { Component } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {
  classOptions = ['Class One', 'Class Two', 'Class Three'];
  students: any[] = [
    {
      id: 1,
      name: 'John Doe',
      father_name: 'Michael Doe',
      gender: 'Male',
      dob: '1990-01-01',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Cityville',
      class: 'Class One',
    },
    {
      id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
      address: '456 Elm St, Townville',
      class: 'Class Two',
    }  ];
}
