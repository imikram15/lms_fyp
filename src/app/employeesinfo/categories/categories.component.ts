import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
   categories = [
    { id: 1, title: 'John' },
    { id: 2, title: 'Jane' },
    { id: 3, title: 'Alice' },
  ];

}
