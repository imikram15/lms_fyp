import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  classOptions = ['Class One', 'Class Two', 'Class Three', 'Class Four', 'Class Five', 'Class Six', 'Class Seven', 'Class Eight', 'Class Nine', 'Class Ten'];

  studentForm = new FormGroup({
    'class': new FormControl('')
  });
}
