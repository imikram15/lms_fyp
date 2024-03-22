import { Component } from '@angular/core';
import { CategoriesService, CategoriesResponse} from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories: CategoriesResponse[] = [];

  constructor(private categoriesService:CategoriesService, ) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res:any)=>{     
      this.categories = res.category;
    })
  }

}
