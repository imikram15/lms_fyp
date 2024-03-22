import { Component } from '@angular/core';
import { DesignationsService,DesignationResponse } from '../../services/designations.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrl: './designations.component.scss'
})
export class DesignationsComponent {
  designations: DesignationResponse[] = [];
  
  constructor(private designationsService:DesignationsService,){}

  ngOnInit(): void {
    this.getDesignationsList();
  }

  getDesignationsList() {
    this.designationsService.getDesignation().subscribe((res:any)=>{     
      this.designations = res.designation;
    })
  }

}
