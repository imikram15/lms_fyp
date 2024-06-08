import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse, UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';
import { ConfirmComponent, ConfirmDialogModel } from '../../shared/confirm/confirm.component';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../services/toastr.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.scss'
})
export class ShowUserComponent extends Paginator{

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  users:any [] = [];
  userForm!: FormGroup;
  roles: any;
  deletecheck: boolean = false;
  nameCheck:boolean = false;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private toastr: ToasterService,
    public dialog: MatDialog,
    public commonService:CommonService
  ) {
    super();
    this.userForm = this.fb.group({
      role_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUsersList();
    this.getRolesList();
  }

  getRolesList() {
    this.userService.getRoles().subscribe((res: any) => {
      this.roles = res.roles;
    }, (error: any) => {
      console.error('Error fetching Roles:', error);
      this.toastr.showError('Failed to fetch Roles. Please try again later.', 'Error');
    });
  }


  getUsersList() {
    this.isLoading = true;
    this.userService.getPaginatedUsers(this.page, this.perPage).subscribe((res: any) => {
      this.users = res.users;
      console.log(res.users);      
      this.page = res.users.current_page;
      this.total = res.users.total;
      this.perPage = res.users.per_page;
      this.isLoading = false;
    }, (error: any) => {
      console.error('Error fetching Users:', error);
      this.toastr.showError('Failed to fetch Users. Please try again later.', 'Error');
      this.isLoading = false;
    });
  }

  loadUsersByRole() {
    this.isLoading = true;
    if (this.userForm.invalid) {
      this.toastr.showError('Please select a role', 'Error');
      return;
    }
    const selectedRole = this.userForm.get('role_id')?.value;
    if (selectedRole) {
      this.userService.getUsersByRole(selectedRole).pipe(
        catchError(err => {
          console.error('Error fetching users:', err);
          this.toastr.showError('No users found for this role.', 'Error');
          return throwError(err);
        })
      ).subscribe(data => {
        this.users = data.users;
        
        this.isLoading = false;
      });
    }
    this.deletecheck = true;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUsersList();
  }

  result: string = '';

  confirmDialog(id: string | number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: { data: dialogData, id: id, loc: 'user' },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.deletecheck === true) {
        this.loadUsersByRole();
      } else {
        this.getUsersList();
      }
    });
  }

}
