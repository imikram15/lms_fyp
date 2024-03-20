import { Component } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {

 classes:any[] = [
  {
    id: 1,
    name: 'Class One',
  },
  {
    id: 2,
    name: 'Class Two',
  }, 
   {
    id: 3,
    name: 'Class Three',
  },
]

}
