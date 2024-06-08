import { Component, ViewChild } from '@angular/core';
import { ExamCategoryService } from '../../services/exam-category.service';
import { ToasterService } from '../../services/toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';

@Component({
  selector: 'app-exam-category',
  templateUrl: './exam-category.component.html',
  styleUrl: './exam-category.component.scss'
})
export class ExamCategoryComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  ExamCategory:any []= [];
  
  
  constructor(private ExamCategoryService:ExamCategoryService,
    private toastr:ToasterService,
    public dialog: MatDialog,
    public commonService:CommonService){
    super();
  }
    
    ngOnInit(){
      this.getExamCategoryList();
    }

    getExamCategoryList() {
      this.isLoading = true;
      this.ExamCategoryService.getPgExamCategories(this.page, this.perPage).subscribe((res: any) => {  
        // console.log(res);           
        this.ExamCategory = res.examCategory.data;
        this.page = res.examCategory.data.current_page;
        this.total = res.examCategory.data.total; 
        this.perPage = res.examCategory.data.per_page;              
        this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching examCategories:', error);
          this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
          this.isLoading = false; 
        }
      );
    }
    
    onTableDataChange(event:any){
      this.page = event;
      console.log(this.page);  
      this.getExamCategoryList();
      }


      result: string = '';

      confirmDialog(id:string|number): void {
        const message = `Are you sure you want to do this?`;
    
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
    
        const dialogRef = this.dialog.open(ConfirmComponent, {
          width: "35%",
          data: {data : dialogData , id:id, loc:'examCategory'},
        });
    
        dialogRef.afterClosed().subscribe(dialogResult => {
          this.result = dialogResult;
          this.getExamCategoryList();
        });
      }
}
