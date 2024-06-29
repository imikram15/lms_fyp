import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarksService } from '../../services/marks.service';
import { ToasterService } from '../../services/toastr.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-view-marks',
  templateUrl: './view-marks.component.html',
  styleUrl: './view-marks.component.scss'
})
export class ViewMarksComponent {

  isLoading: boolean = false;
  marks: any[] = [];
  filterForm!: FormGroup;
  member_type:any;
  member_id:any;

  constructor(
    private marksService: MarksService,
    private toastr: ToasterService
  ) {
    this.member_type = localStorage.getItem('member_type');
    this.member_id = localStorage.getItem('member_id');
    
  }

  ngOnInit() {
    this.searchMarks();
  }

  searchMarks() {
      this.isLoading = true;

    this.marksService.getMarksByMember(this.member_type, this.member_id).pipe(
      catchError(err => {
        console.error('Error fetching marks:', err);
        this.toastr.showError('No marks found for the specified criteria.', 'Error');
        this.isLoading = false;
        return throwError(err);
      })
    ).subscribe(
      (data: any) => {
        console.log(data);
        
        this.marks = data.marks;
        this.isLoading = false;
      }
    );
  }
}
