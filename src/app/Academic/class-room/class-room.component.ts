import { Component, ViewChild } from '@angular/core';
import { ClassRoomService, ClassroomResponse } from '../../services/class-room.service';
import { ToasterService } from '../../services/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrl: './class-room.component.scss'
})
export class ClassRoomComponent extends Paginator{
  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  classRoomList: ClassroomResponse[] = [];

   
  constructor(private classroomService:ClassRoomService,
    private toastr:ToasterService,
    public dialog: MatDialog,){
    super();
  }
    
    ngOnInit(){
      this.getClassesList();
    }

    getClassesList() {
      this.isLoading = true;
      this.classroomService.getPaginatedClassrooms(this.page, this.perPage).subscribe((res: any) => {  
        console.log(res.classes);
           
        this.classRoomList = res.classrooms.data;
        this.page = res.classrooms.current_page;
        this.total = res.classrooms.total; 
        this.perPage = res.classrooms.per_page;              
        this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching classes:', error);
          this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
          this.isLoading = false; 
        }
      );
    }
    
    onTableDataChange(event:any){
      this.page = event;
      console.log(this.page);  
      this.getClassesList();
      }


      result: string = '';

      confirmDialog(id:string|number): void {
        const message = `Are you sure you want to do this?`;
    
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
    
        const dialogRef = this.dialog.open(ConfirmComponent, {
          width: "35%",
          data: {data : dialogData , id:id, loc:'classroom'},
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
          this.getClassesList();
        });
      }

}
