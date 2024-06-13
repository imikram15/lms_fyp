import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  UrlForStudents = [
    '/dashboard', 
    '/students', 
    '/attendance', 
    '/teachers', 
    '/class-routine', 
    '/subject', 
    '/syllabus', 
    '/classes', 
    '/class-room', 
    '/login', 
    '/live-class', 
    '/marks', 
    '/examination',
    '/exam-category', 
    '/grades',
    '/events',
  ];
  UrlForTeachers = [
    '/dashboard', 
    '/students', 
    '/teachers', 
    '/attendance', 
    '/take-attendance',  
    '/class-routine', 
    '/subject', 
    '/syllabus', 
    '/add-syllabus', 
    '/classes', 
    '/class-room',
    '/login', 
    '/live-class', 
    '/marks', 
    '/examination', 
    '/exam-category',
    '/grades', 
    '/events',
  ];
  UrlForEmployees = [
    '/dashboard', 
    '/employees', 
    '/add-employees', 
    '/categories', 
    '/add-categories', 
    '/designations', 
    '/add-designations', 
    '/departments',
    '/add-departments', 
    '/students', 
    '/add-students', 
    '/teachers', 
    '/add-teachers', 
    '/attendance',
    '/take-attendance', 
    '/class-routine', 
    '/add-class-routine', 
    '/subject', 
    '/add-subject', 
    '/syllabus',
    '/add-syllabus', 
    '/classes', 
    '/add-class', 
    '/add-class-room', 
    '/class-room',
    '/login', 
    '/live-class', 
    '/marks', 
    '/examination',
    '/add-exam',
    '/exam-category', 
    '/add-exam-category', 
    '/grades', 
    '/student-fee-manager',
    '/events',
    '/add-event',
    '/add-event/1/edit'
  ];
  UrlForAdmin = [
    '/dashboard', 
    '/employees', 
    '/add-employees', 
    '/add-employees/1/edit', 
    '/categories', 
    '/add-categories', 
    '/add-categories/1/edit', 
    '/designations', 
    '/add-designations',
    '/add-designations/1/edit', 
    '/departments',
    '/add-departments', 
    '/add-departments/2/edit', 
    '/students', 
    '/add-students', 
    '/add-students/2/edit', 
    '/teachers', 
    '/add-teachers',
    '/add-teachers/1/edit', 
    '/attendance',
    '/take-attendance', 
    '/class-routine', 
    '/add-class-routine', 
    '/add-class-routine/1/edit', 
    '/subject', 
    '/add-subject', 
    '/add-subject/2/edit',
    '/syllabus', 
    '/add-syllabus', 
    '/add-syllabus/6/edit', 
    '/classes', 
    '/add-class', 
    '/add-class/1/edit', 
    '/show-user', 
    '/add-user', 
    '/add-user/3/edit', 
    '/add-class-room', 
    '/class-room',
    '/add-class-room/2/edit',
    '/login', 
    '/live-class', 
    '/marks', 
    '/examination',
    '/add-exam',
    '/add-exam/1/edit',
    '/exam-category', 
    '/add-exam-category', 
    '/add-exam-category/2/edit',
    '/promotion',
    '/grades', 
    '/student-fee-manager',
    '/events',
    '/add-event',
    '/add-event/1/edit'
  ];
  
  role_id:any;
  constructor() {

    this.role_id = localStorage.getItem('role_id');
   }

  getUrl(url:any){
      switch(this.role_id){
        case '1':
        {          
          return this.isValidUrl(url,this.UrlForTeachers)
          break;
        }
        case '2':
          {
            return this.isValidUrl(url,this.UrlForStudents)
            break;
          }
          case '3':
          {
            return this.isValidUrl(url,this.UrlForEmployees)
            break;
          }
          case '4':
          {
            return this.isValidUrl(url,this.UrlForAdmin)
            break;
          }
        default:{
          return false
        }
    }
  }

  isValidUrl(url:any, validUrls:any) {
    return validUrls.some((validUrl:any) => {
        const urlParts = url.split('/');
        const validUrlParts = validUrl.split('/');

        if (urlParts.length !== validUrlParts.length) {
            return false;
        }

        return validUrlParts.every((part: number, index: string | number) => {
            if (part === urlParts[index]) {
                return true;
            }
            if (!isNaN(part) && !isNaN(urlParts[index])) {
                return true;
            }
            return false;
        });
    });
  }
 
  checkDeleteRole(){
    if (this.role_id === '4') {
      return true   
    } else
    return false
  }

}
