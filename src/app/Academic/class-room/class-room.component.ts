import { Component } from '@angular/core';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrl: './class-room.component.scss'
})
export class ClassRoomComponent {
  classes:any[] = [
    {
      name: 'Class One',
    },
    {
      name: 'Class Two',
    }, 
    {
      name: 'Class Three',
    },
  ]

}
