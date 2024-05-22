import { Component, ViewChild } from '@angular/core';
import { StudentsResponse, StudentsService } from '../../services/students.service';
import { Paginator } from '../../paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { environment } from '../../../environments/environment.development';
import { ToasterService } from '../../services/toastr.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  students: StudentsResponse[]=[];
  imgUrl = environment.mediaUrl;

  constructor(private studentsService:StudentsService,
    public dialog: MatDialog,
    private toastr:ToasterService,){
    super();
  }

  ngOnInit(){
    this.getStudentsList();
  }
  getStudentsList(){{
    this.isLoading = true;
    this.studentsService.getPaginatedStudents(this.page, this.perPage).subscribe((res: any) => {
      this.students = res.students.data;
      this.page = res.students.current_page;
      this.total = res.students.total; 
      this.perPage = res.students.per_page;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
      this.isLoading = false; 
    }
    )
  }}
  
  classOptions = ['Class One', 'Class Two', 'Class Three'];
 
  result: string = '';

  confirmDialog(id:string|number): void {
    const message = `Are you sure you want to delete this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: {data : dialogData , id:id, loc:'student'},
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getStudentsList();
    });
  }

  onTableDataChange(event:any){
    this.page = event;
    console.log(this.page);  
    this.getStudentsList();
    }
  

}
