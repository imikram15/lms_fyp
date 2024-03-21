import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { EmployeeComponent } from '../employeesinfo/employee/employee.component';
import { CategoriesComponent } from '../employeesinfo/categories/categories.component';
import { DesignationsComponent } from '../employeesinfo/designations/designations.component';
import { DepartmentsComponent } from '../employeesinfo/departments/departments.component';
import { AddEmployeeComponent } from '../employeesinfo/add-employee/add-employee.component';
import { AddCategoriesComponent } from '../employeesinfo/add-categories/add-categories.component';
import { AddDepartmentsComponent } from '../employeesinfo/add-departments/add-departments.component';
import { AddDesignationsComponent } from '../employeesinfo/add-designations/add-designations.component';
import { StudentsComponent } from '../studentsinfo/students/students.component';
import { AddStudentComponent } from '../studentsinfo/add-student/add-student.component';
import { ClassesComponent } from '../studentsinfo/classes/classes.component';
import { AddClassComponent } from '../studentsinfo/add-class/add-class.component';

import { AttendanceComponent } from '../Academic/attendance/attendance.component';
import { TakeAttendanceComponent } from '../Academic/take-attendance/take-attendance.component';
import { ClassRoutineComponent } from '../Academic/class-routine/class-routine.component';
import { AddClassRoutineComponent } from '../Academic/add-class-routine/add-class-routine.component';
import { SubjectComponent } from '../Academic/subject/subject.component';
import { AddSubjectComponent } from '../Academic/add-subject/add-subject.component';


const routes: Routes = [
  { path: 'dashboard', component:DashboardComponent  },
  { path: 'employees', component:EmployeeComponent  },
  { path: 'add-employees', component:AddEmployeeComponent  },
  { path: 'categories', component:CategoriesComponent },
  { path: 'add-categories', component:AddCategoriesComponent },
  { path: 'designations', component:DesignationsComponent  },
  { path: 'add-designations', component:AddDesignationsComponent },
  { path: 'departments', component:DepartmentsComponent  },
  { path: 'add-departments', component:AddDepartmentsComponent  },
  { path: 'students', component:StudentsComponent  },
  { path: 'add-students', component:AddStudentComponent  },
  { path: 'classes', component:ClassesComponent  },
  { path: 'add-class', component:AddClassComponent },
  { path: 'pagenotfound', component:PageNotFoundComponent  },
  { path: 'attendance', component:AttendanceComponent  },
  { path: 'take-attendance', component:TakeAttendanceComponent },
  { path: 'class-routine', component:ClassRoutineComponent },
  { path: 'add-class-routine', component:AddClassRoutineComponent },
  { path: 'subject', component:SubjectComponent},
  { path: 'add-subject', component:AddSubjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
