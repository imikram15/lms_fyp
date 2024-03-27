import { Component } from '@angular/core';

@Component({
  selector: 'app-student-fee-manager',
  templateUrl: './student-fee-manager.component.html',
  styleUrl: './student-fee-manager.component.scss'
})
export class StudentFeeManagerComponent {
  showTable: boolean = false;
  invoices: any[] = [
    { invoiceNo: 'INV001', studentName: 'John Doe', invoiceTitle: 'Tuition Fee', totalAmount: 100, paidAmount: 50, status: 'Paid' },
    { invoiceNo: 'INV002', studentName: 'Jane Smith', invoiceTitle: 'Book Fee', totalAmount: 50, paidAmount: 50, status: 'Paid' },
    { invoiceNo: 'INV003', studentName: 'Alice Johnson', invoiceTitle: 'Exam Fee', totalAmount: 75, paidAmount: 0, status: 'Unpaid' },
    // Add more sample data as needed
  ];
  classes: any[] = [
    { id: 1, name: 'Class A' },
    { id: 2, name: 'Class B' },
    { id: 3, name: 'Class C' },
    // Add more sample data as needed
  ];

  constructor() { }

  filter() {
    // Implement your filter logic here
    this.showTable = true; // Show the table after filtering
  }

}
