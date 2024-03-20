import { Component } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
departments = [
  { id: 1, title: 'John' },
  { id: 2, title: 'Jane' },
  { id: 3, title: 'Alice' },
];

}
