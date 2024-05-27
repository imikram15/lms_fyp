import { Component, ViewChild } from '@angular/core';
import { ClassesService, ClassesResponse} from '../../services/classes.service';
import { ToasterService } from '../../services/toastr.service';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  classes: ClassesResponse[] = [];
  
  
  constructor(private classesService:ClassesService,
    private toastr:ToasterService,
    public dialog: MatDialog,){
    super();
  }
    
    ngOnInit(){
      this.getClassesList();
    }

    getClassesList() {
      this.isLoading = true;
      this.classesService.getPaginatedClasses(this.page, this.perPage).subscribe((res: any) => {  
        console.log(res.classes);
           
        this.classes = res.classes.data;
        this.page = res.classes.current_page;
        this.total = res.classes.total; 
        this.perPage = res.classes.per_page;              
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
          data: {data : dialogData , id:id, loc:'class'},
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
          this.getClassesList();
        });
      }

}
