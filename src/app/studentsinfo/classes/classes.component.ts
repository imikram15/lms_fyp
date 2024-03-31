import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassesService, ClassesResponse} from '../../services/classes.service';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  classes: ClassesResponse[] = [];
  
  
  constructor(private classesService:ClassesService,
    private toastr:ToasterService    ){}
    
    ngOnInit(){
      console.log(this.classes);
      this.getClassesList();
    }

    getClassesList() {
      this.isLoading = true;
      this.classesService.getClasses().subscribe(
        (res: any) => {     
          this.classes = res.class; 
          console.log(this.classes);               
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching classes:', error);
          this.toastr.showError('Failed to fetch Class. Please try again later.','Error');
          this.isLoading = false; 
        }
      );
    }
    


}
