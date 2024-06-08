import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ToasterService } from '../../services/toastr.service';
import { ConfirmDialogModel, ConfirmComponent } from '../../shared/confirm/confirm.component';
import { ExamsService } from '../../services/exams.service';
import { Paginator } from '../../paginator';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrl: './examination.component.scss'
})
export class ExaminationComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  exams:any [] = [];
  examForm!: FormGroup;
  selectedClass: any;
  classes: any;
  deleteCheck: boolean = false;

  constructor(
    private examService: ExamsService,
    private fb: FormBuilder,
    private toastr: ToasterService,
    public dialog: MatDialog,
    public commonService: CommonService
  ) {
    super();
    this.examForm = this.fb.group({
      class_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getExamsList();
    this.getClassesList();
  }

  getClassesList() {
    this.examService.getclasses().subscribe(
      (res: any) => {
        this.classes = res.classes.data;
      },
      (error: any) => {
        console.error('Error fetching Classes:', error);
        this.toastr.showError('Failed to fetch Classes. Please try again later.', 'Error');
      }
    );
  }

  getExamsList() {
    this.isLoading = true;
    this.examService.getPgExams(this.page, this.perPage).subscribe(
      (res: any) => {
        this.exams = res.exams.data;
        this.page = res.exams.current_page;
        this.total = res.exams.total;
        this.perPage = res.exams.per_page;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching Exams:', error);
        this.toastr.showError('Failed to fetch Exams. Please try again later.', 'Error');
        this.isLoading = false;
      }
    );
  }

  loadExamsByClass() {
    this.isLoading = true;
    if (this.examForm.invalid) {
      this.toastr.showError('Please select a class.', 'Error');
      return;
    }
    this.selectedClass = this.examForm.get('class_id')?.value;
    console.log(this.selectedClass);
    
    if (this.selectedClass) {
      this.examService.getExamsByClass(this.selectedClass).pipe(
        catchError(err => {
          console.error('Error fetching exams:', err);
          this.toastr.showError('No exams found for this class.', 'Error');
          return throwError(err);
        })
      ).subscribe(
        (data: any) => {
          this.exams = data.exams;
          this.isLoading = false;
        }
      );
    }
    this.deleteCheck = true;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getExamsList();
  }

  confirmDialog(id: string | number): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: { data: dialogData, id: id, loc: 'exam' },
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (this.deleteCheck === true) {
          this.loadExamsByClass();
        } else {
          this.getExamsList();
        }
      }
    });
  }

   formatTime(inputTime:any) {
    const [hours, minutes] = inputTime.split(':').map(Number);
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }


}
