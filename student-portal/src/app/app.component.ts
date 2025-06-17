// src/app/app.component.ts
import { Component } from '@angular/core';
import { Student } from './Student/student.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  students: Student[] = [];
  nextId = 1;

  addStudent(student: Omit<Student, 'id'>) {
    const newStudent: Student = { ...student, id: this.nextId++ };
    this.students.push(newStudent);
  }

  onActivate(componentRef: any) {
    if ('students' in componentRef) {
      componentRef.students = this.students;
    }

    if ('studentAdded' in componentRef) {
      componentRef.studentAdded.subscribe((studentData: any) => {
        this.addStudent(studentData);
      });
    }
  }
}
