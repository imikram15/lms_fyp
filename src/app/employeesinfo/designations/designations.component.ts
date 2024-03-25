import { Component, ViewChild } from '@angular/core';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrl: './designations.component.scss'
})
export class DesignationsComponent {

  @ViewChild('elseForm') elseForm: any;
  designations: DesignationResponse[] = [];
  isLoading:boolean = false;
 
  
  constructor(private designationsService:DesignationsService,){}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.getDesignationsList();
    });
  }
  

  getDesignationsList() {
    this.isLoading = true;
    this.designationsService.getDesignation().subscribe((res:any)=>{     
      this.designations = res.designation;
      this.isLoading = false;
    })
  }

}
