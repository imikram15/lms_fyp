import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm!: FormGroup;
  forUpdate: boolean = false;
  userID: any;
  userUpdate: any;
  errors: any = [];
  roles: any;
  memType:any[]=[];
  userTypeID:any;
  isLoading:boolean = false;
  nameCheck:boolean = false;
  member_type_title = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      member_id: ['', Validators.required],
      member_type: ['', Validators.required],
      role_id: ['', Validators.required],
    });

    this.userID = this.route.snapshot.paramMap.get('id');
    if (this.userID) {
      this.userService.getUser(this.userID).subscribe((res: any) => {
        if (res.user && res.user.id) {
          this.forUpdate = true;
          this.userUpdate = res.user;
          this.userForm.patchValue({
            email: this.userUpdate.email,
            member_id: this.userUpdate.member_id,
            member_type: this.userUpdate.member_type,
            role_id: this.userUpdate.role_id,
          });
        } else {
          this.toastr.showError('User data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching User data:', error);
      });
    }

    this.getRolesList();
    // this.getUsersList();
  }
 
 
  getMembersList(){
     this.userTypeID = this.userForm.get('member_type')?.value;
     const value = this.roles.find((el:any )=> el.id == this.userTypeID)
     this.member_type_title = value.title;
     
     this.isLoading = true;
    if (this.userTypeID === '2') { this.nameCheck = true; } else {  this.nameCheck = false; }
    this.userService.getUserByType(this.userTypeID).subscribe((res: any) => {
     this.memType = res.data;  
     this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching Users:', error);
      this.toastr.showError('Failed to fetch Users. Please try again later.', 'Error');
    }); 
  }

  getRolesList() {
    this.userService.getRoles().subscribe((res: any) => {
      this.roles = res.roles;
      // console.log(res.roles);
    },
    (error: any) => {
      console.error('Error fetching Roles:', error);
      this.toastr.showError('Failed to fetch Roles. Please try again later.', 'Error');
    });
  }

  onSubmit() {
    const formData = this.userForm.value;
    Object.assign(formData,{member_type:this.member_type_title});

    if (this.forUpdate) {
      this.userService.updateUser(this.userID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.userForm.reset();
          this.router.navigate(['/show-user']);
          this.toastr.showSuccess('User updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.userService.saveUser(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.userForm.reset();
          this.router.navigate(['/show-user']);
          this.toastr.showSuccess('User added successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.log(err);
        }
      });
    }
  }

  private handle422Error(err: any): void {
    if (err.status === 422 && err.error && err.error.errors) {
      const errorMessages = Object.values(err.error.errors).flat();
      errorMessages.forEach((message: any) => {
        this.toastr.showError(message, 'Error');
      });
    } else {
      this.toastr.showError('An unexpected error occurred. Please try again later.', 'Error');
    }
  }

}
