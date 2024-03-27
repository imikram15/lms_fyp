import { Component, ViewChild } from '@angular/core';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    
  @ViewChild('elseForm') elseForm: any;
  isLoading:boolean = false;
  categories: CategoriesResponse[] = [];

  constructor(private categoriesService:CategoriesService, ) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {    
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe((res:any)=>{     
      this.categories = res.category;      
    this.isLoading = false;
    })
  }
  
  deleteCategory(categoryID: number) {
    if(confirm("Are you sure! You want to Delete?")){
      this.categoriesService.destroyCategory(categoryID).subscribe( (res: any) => {
        this.getCategoriesList();
        alert(res.message);   })
    }
    }

}
