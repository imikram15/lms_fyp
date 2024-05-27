import { Component, OnInit, Inject, ViewChild, input, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../../services/employees.service';
import { ClassesService } from '../../services/classes.service';
import { TeachersService } from '../../services/teachers.service';
import { StudentsService } from '../../services/students.service';
import { ClassRoomService } from '../../services/class-room.service';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent implements OnInit {
  title: string;
  message: string;
  id!:number|string;
   
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private employeeService:EmployeesService,
    private classService:ClassesService,
    private teacherService:TeachersService,
    private studentService:StudentsService,
    private classroomService:ClassRoomService,
    private subjectService:SubjectsService,

    ) {
   
    this.title = data.data.title ;
    this.message = data.data.message;
    
  } 

  ngOnInit() {
  }

  onConfirm(): void {
    switch (this.data.loc) {
      case 'employee':
        this.employeeService.destroyEmployee(this.data.id).subscribe((res: any) => { 
          this.dialogRef.close(true);              
        });
        break;
      
      case 'class':
        this.classService.destroyClass(this.data.id).subscribe((res: any) => { 
          this.dialogRef.close(true);              
        });
        break;
      case 'teacher':
        this.teacherService.destroyTeacher(this.data.id).subscribe((res: any) => { 
          this.dialogRef.close(true);              
        });
        break;
      case 'student':
        this.studentService.destroyStudent(this.data.id).subscribe((res: any) => { 
          this.dialogRef.close(true);              
        });
        break;
        case 'classroom':
        this.classroomService.deleteClassroom(this.data.id).subscribe((res: any) => { 
          this.dialogRef.close(true);              
        });
        break;
        case 'subject':
          this.subjectService.destroySubject(this.data.id).subscribe((res: any) => { 
            this.dialogRef.close(true);              
          });
          break;
    
      default:        
        break;
    }
    
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }

}
