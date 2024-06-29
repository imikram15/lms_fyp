import { Component ,AfterViewInit} from '@angular/core';
import { CommonService } from '../../services/common.service';
declare var $: any;
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit  {

  constructor(
    public commonService:CommonService
  ){
  }
   ngAfterViewInit() {
    $('#sidebarToggle').on('click', function () {
      $('.sidebar').toggleClass('toggled');
    });
  }

}
