import { Component } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {}

  get teachers(): any[] {
    return this.paginationService.teachers;
  }

  get page(): number {
    return this.paginationService.page;
  }

  get pageSize(): number {
    return this.paginationService.pageSize;
  }

  get pagedTeachers(): any[] {
    return this.paginationService.getPagedTeachers();
  }

  get totalPages(): number[] {
    return this.paginationService.getTotalPages();
  }

  prevPage(): void {
    this.paginationService.prevPage();
  }

  nextPage(): void {
    this.paginationService.nextPage();
  }

  goToPage(pageNumber: number): void {
    this.paginationService.goToPage(pageNumber);
  }

}
