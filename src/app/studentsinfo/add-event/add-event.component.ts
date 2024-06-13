import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../services/toastr.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

   eventForm!: FormGroup;
  forUpdate: boolean = false;
  eventID: any;
  eventUpdate: any;
  errors: any = [];

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.eventID = this.route.snapshot.paramMap.get('id');
    if (this.eventID) {
      this.eventService.getEvent(this.eventID).subscribe((res: any) => {
        console.log(res);
        
        if (res.event && res.event.id) {
          this.forUpdate = true;
          this.eventUpdate = res.event;
          this.eventForm.patchValue({
            eventTitle: this.eventUpdate.eventTitle,
            date: this.eventUpdate.date,
            status: this.eventUpdate.status,
          })
        } else {
          this.toastr.showError('Event data not found or invalid format:', res);
        }
      }, error => {
        console.error('Error fetching event data:', error);
      });
    }
  }

  onSubmit() {
    const formData = this.eventForm.value;

    if (this.forUpdate) {
      this.eventService.updateEvent(this.eventID, formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.eventForm.reset();
          this.router.navigate(['/events']);
          this.toastr.showSuccess('Event updated successfully!', 'Success');
        },
        error: (err: any) => {
          this.handle422Error(err);
          console.error(err);
        }
      });
    } else {
      this.eventService.saveEvent(formData).subscribe({
        next: (res: any) => {
          console.log(res, 'response');
          this.eventForm.reset();
          this.router.navigate(['/events']);
          this.toastr.showSuccess('Event added successfully!', 'Success');
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
