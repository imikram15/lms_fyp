import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pageSize: number = 5;
  page: number = 1;
  teachers: any[] = [
    {
      id: 1,
      department_id: 1,
      designation_id: 1,
      category_id: 1,
      name: 'John Doe',
      father_name: 'Michael Doe',
      gender: 'Male',
      dob: '1990-01-01',
      email: 'john.doe@example.com',
      phone: '1234567890',
    },
    {
      id: 2,
      department_id: 2,
      designation_id: 2,
      category_id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
    },
    {
      id: 3,
      department_id: 3,
      designation_id: 3,
      category_id: 3,
      name: 'Alice Johnson',
      father_name: 'Robert Johnson',
      gender: 'Female',
      dob: '1985-07-20',
      email: 'alice.johnson@example.com',
      phone: '5551234567',
    },
    {
      id: 4,
      department_id: 4,
      designation_id: 4,
      category_id: 4,
      name: 'Michael Brown',
      father_name: 'William Brown',
      gender: 'Male',
      dob: '1988-11-30',
      email: 'michael.brown@example.com',
      phone: '9879879870',
    },
    {
      id: 5,
      department_id: 5,
      designation_id: 5,
      category_id: 5,
      name: 'Emily Davis',
      father_name: 'James Davis',
      gender: 'Female',
      dob: '1992-04-05',
      email: 'emily.davis@example.com',
      phone: '3217896540',
    },
    {
      id: 6,
      department_id: 2,
      designation_id: 2,
      category_id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
    },
    {
      id: 7,
      department_id: 3,
      designation_id: 3,
      category_id: 3,
      name: 'Alice Johnson',
      father_name: 'Robert Johnson',
      gender: 'Female',
      dob: '1985-07-20',
      email: 'alice.johnson@example.com',
      phone: '5551234567',
    },
    {
      id: 8,
      department_id: 4,
      designation_id: 4,
      category_id: 4,
      name: 'Michael Brown',
      father_name: 'William Brown',
      gender: 'Male',
      dob: '1988-11-30',
      email: 'michael.brown@example.com',
      phone: '9879879870',
    },
    {
      id: 9,
      department_id: 2,
      designation_id: 2,
      category_id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
    },
    {
      id: 10,
      department_id: 3,
      designation_id: 3,
      category_id: 3,
      name: 'Alice Johnson',
      father_name: 'Robert Johnson',
      gender: 'Female',
      dob: '1985-07-20',
      email: 'alice.johnson@example.com',
      phone: '5551234567',
    },
    {
      id: 11,
      department_id: 4,
      designation_id: 4,
      category_id: 4,
      name: 'Michael Brown',
      father_name: 'William Brown',
      gender: 'Male',
      dob: '1988-11-30',
      email: 'michael.brown@example.com',
      phone: '9879879870',
    },
    {
      id: 12,
      department_id: 3,
      designation_id: 3,
      category_id: 3,
      name: 'Alice Johnson',
      father_name: 'Robert Johnson',
      gender: 'Female',
      dob: '1985-07-20',
      email: 'alice.johnson@example.com',
      phone: '5551234567',
    },
    {
      id: 13,
      department_id: 4,
      designation_id: 4,
      category_id: 4,
      name: 'Michael Brown',
      father_name: 'William Brown',
      gender: 'Male',
      dob: '1988-11-30',
      email: 'michael.brown@example.com',
      phone: '9879879870',
    },
    {
      id: 14,
      department_id: 2,
      designation_id: 2,
      category_id: 2,
      name: 'Jane Smith',
      father_name: 'David Smith',
      gender: 'Female',
      dob: '1995-02-15',
      email: 'jane.smith@example.com',
      phone: '9876543210',
    },
  ];

  constructor() {}

  getPagedTeachers(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.teachers.slice(startIndex, endIndex);
  }

  getTotalPages(): number[] {
    return Array(Math.ceil(this.teachers.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage(): void {
    if (this.page < this.getTotalPages().length) {
      this.page++;
    }
  }

  goToPage(pageNumber: number): void {
    this.page = pageNumber;
  }
}
