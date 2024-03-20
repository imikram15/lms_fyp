import { Component } from '@angular/core';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrl: './designations.component.scss'
})
export class DesignationsComponent {

  designations = [
    { id: 1, title: 'John' },
    { id: 2, title: 'Jane' },
    { id: 3, title: 'Alice' },
  ];
  
}
