import { Component, ViewChild } from '@angular/core';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';
import { ToasterService } from '../../services/toastr.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrl: './designations.component.scss'
})
export class DesignationsComponent {
  
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  designations: DesignationResponse[] = [];
  
  
  constructor(private designationsService:DesignationsService,
    private toastr:ToasterService,
    public commonService:CommonService ){}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.getDesignationsList();
    });
  }
  
  
  getDesignationsList() {
    this.isLoading = true;
    this.designationsService.getDesignations().subscribe((res:any)=>{     
      this.designations = res.designation;
      this.isLoading = false;
    },    
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
      this.isLoading = false; 
    }    )
  }
  
  deleteDesignation(designationID: number) {
    if(confirm("Are you sure! You want to Delete?")){
      this.designationsService.destroyDesignation(designationID).subscribe( (res: any) => {
        this.getDesignationsList();
        alert(res.message);   })
    }
  }
}
