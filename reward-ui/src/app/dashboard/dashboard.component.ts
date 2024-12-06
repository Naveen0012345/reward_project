import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Sample data for topics
  topics: string[] = [
    'Angular Basics',
    'Advanced Angular',
    'RxJS Observables',
    'Angular Routing',
    'Angular Forms',
    'Dependency Injection',
    'Angular Services',
    'HTTP Client in Angular',
    'Angular Animations',
    'Angular Testing'
  ];

  // Example of customer data
  customersCount: number = 120;
  currentRunningTasks: number = 5;

  // Selected topic from dropdown
  selectedTopic: string = '';

  constructor() { }

  ngOnInit(): void {
    // Initialization logic can be placed here if needed
  }

}
