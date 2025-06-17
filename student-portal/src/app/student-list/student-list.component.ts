import { Component, OnInit } from '@angular/core';
// Define the Student interface here if not available elsewhere
export interface Student {
dob: any;
course: any;
email: any;
  id: number;
  name: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  ngOnInit() {
    this.students = JSON.parse(localStorage.getItem('students') || '[]');
  }
}
