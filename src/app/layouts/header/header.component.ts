import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  role_name:any;
  constructor(private authService:AuthService,
    private router:Router,
  ){
    this.role_name = localStorage.getItem('role_name');
    
  }
  
  isActive(url: string): boolean {
  return this.router.url === url;
}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
}
}
