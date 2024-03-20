import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  employees: any[] = [
    {
      id: 1,
      department_id: 1,
      designation_id: 1,
      category_id: 1,
      name: 'John Doe',
      father_name: 'Michael Doe',
      gender: 'Male',
      dob: '1990-01-01',
      email: 'john.doe@example.com',
      phone: '1234567890',
      joining_date: '2022-01-01',
      address: '123 Main St, Cityville',
      created_at: '2022-01-01T12:00:00Z'
    },
    {
      id: 2,
      department_id: 2,
      designation_id: 2,
      category_id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
      joining_date: '2022-02-01',
      address: '456 Elm St, Townville',
      created_at: '2022-02-01T12:00:00Z'
    }  ];

}
