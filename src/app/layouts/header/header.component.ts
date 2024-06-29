import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToasterService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment.development';
import { CommonService } from '../../services/common.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
 
  ngAfterViewInit() {
  //   $('#sidebarToggle').on('click', function () {
  //     $('.sidebar').toggleClass('toggled');
  //     $('.main-content').toggleClass('toggled');
  //     $('.topbar').toggleClass('toggled');
  //   });
  }

  member_type:any;
  member_id:any;
  users:any;
  imgUrl = environment.mediaUrl;
  isloading = false;

  constructor(private authService:AuthService,
    private router:Router,
    public commonService:CommonService,
    private userService: UsersService,
     private toastr: ToasterService,
  ){
    this.member_type = localStorage.getItem('member_type');
    this.member_id = localStorage.getItem('member_id');
    
  }

  ngOnInit(){
     this.getUserDataByTypeandID();
  }

   getUserDataByTypeandID() {
   this.isloading = true;
    this.userService.getUserByTypeandID(this.member_id, this.member_type).subscribe((res: any) => {
    this.users = res.data;
    this.isloading = false;

    }, (error: any) => {
      console.error('Error fetching User Data:', error);
      this.toastr.showError('Failed to fetch User Data. Please try again later.', 'Error');
      this.isloading = false;
    });
  }
  
  isActive(url: string): boolean {
  return this.router.url === url;
}
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
}
}
