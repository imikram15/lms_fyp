import { Component, ViewChild } from '@angular/core';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  categories: CategoriesResponse[] = [];

  constructor(private categoriesService:CategoriesService,
    private toastr:ToasterService ) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {    
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe((res:any)=>{     
      this.categories = res.category;      
    this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching classes:', error);
      this.toastr.showError('Failed to fetch Categories. Please try again later.','Error');
      this.isLoading = false; 
    }
    )
  }
  
  deleteCategory(categoryID: number) {
    if(confirm("Are you sure! You want to Delete?")){
      this.categoriesService.destroyCategory(categoryID).subscribe( (res: any) => {
        this.getCategoriesList();
        alert(res.message);   })
    }
    }

}
