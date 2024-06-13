import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from '../../paginator';
import { CommonService } from '../../services/common.service';
import { EventService } from '../../services/event.service';
import { ToasterService } from '../../services/toastr.service';
import { ConfirmDialogModel, ConfirmComponent } from '../../shared/confirm/confirm.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent extends Paginator implements OnInit {

  @ViewChild('elseForm') elseForm: any;
  isLoading: boolean = false;
  events: any[] = [];

  constructor(private eventService: EventService,
        private toastr: ToasterService,
        public dialog: MatDialog,
        public commonService: CommonService) {
    super();
  }

  ngOnInit() {
    this.getEventsList();
  }

  getEventsList() {
    this.isLoading = true;
    this.eventService.getPaginatedEvents(this.page, this.perPage).subscribe((res: any) => {
      this.events = res.events.data;
      this.page = res.events.current_page;
      this.total = res.events.total;
      this.perPage = res.events.per_page;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error fetching events:', error);
      this.toastr.showError('Failed to fetch events. Please try again later.', 'Error');
      this.isLoading = false;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getEventsList();
  }

  result: string = '';

  confirmDialog(id: string | number): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "35%",
      data: { data: dialogData, id: id, loc: 'event' },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.getEventsList();
    });
  }
}
