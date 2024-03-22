import { Component } from '@angular/core';

@Component({
  selector: 'app-class-routine',
  templateUrl: './class-routine.component.html',
  styleUrl: './class-routine.component.scss'
})
export class ClassRoutineComponent {
selectClass(_t15: string) {
throw new Error('Method not implemented.');
}
selectSection(_t23: string) {
throw new Error('Method not implemented.');
}
  classOptions: string[] = ["Class One", "Class Two", "Class Three", "Class Four", "Class Five", "Class Six", "Class Seven", "Class Eight", "Class Nine", "Class Ten"];
  sectionOptions: string[] = ["Section A", "Section B", "Section C", "Section D"];
  

}
