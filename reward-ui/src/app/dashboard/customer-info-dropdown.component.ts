import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-info-dropdown',
  templateUrl: './customer-info-dropdown.component.html',
  styleUrls: ['./customer-info-dropdown.component.css']
})
export class CustomerInfoDropdownComponent implements OnInit {

  // Sample data for topics
  topics: string[] = [
    'Number of Customers',
    'Count of current running offers',
    'Recent scanned customers',
    
  ];

  // Example of customer data
  /* customersCount: number = 120;
  currentRunningTasks: number = 5; */

  // Selected topic from dropdown
  selectedTopic: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can be placed here if needed
  }

}
