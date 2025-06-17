import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { Student } from '../student-list/student-list.component';  // ✅ Make sure the path is correct
import { Student } from '../Student/student.module'; // Adjust the import path as necessary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent {
  showError = false;
  showSuccess = false;
  errorMessage = '';
  successMessage = '';
  isEligible = true;
  note: any;

  constructor(private fb: FormBuilder) {}

  studentForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    dob: ['', Validators.required]
  });

  onSubmit() {
    if (this.studentForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly!';
      this.showError = true;
      this.autoHide();
      return;
    }

    const dob = new Date(this.studentForm.value.dob!);
    const cutoff = new Date('2001-01-01');
    if (dob > cutoff) {
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      const newStudent: Student = {
        id: students.length + 1,
        name: this.studentForm.value.name!,
        email: this.studentForm.value.email!,
        course: this.studentForm.value.course!,
        dob: this.studentForm.value.dob!
      };
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));

      this.successMessage = '✅ Student added successfully!';
      this.showSuccess = true;
      this.studentForm.reset();
      this.autoHide();
    } else {
      this.errorMessage = '❌ Not eligible! DOB must be after 2001.';
      this.showError = true;
      this.autoHide();
    }
  }

  autoHide() {
    setTimeout(() => {
      this.showSuccess = false;
      this.showError = false;
    }, 3000);
  }
}
// import { Component, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NotificationComponent } from '../notification/notification.component';

// @Component({
//   selector: 'app-add-student',
//   templateUrl: './add-student.component.html'
// })
// export class AddStudentComponent {
//   studentForm: FormGroup;

//   @ViewChild('note') note!: NotificationComponent;

//   constructor(private fb: FormBuilder) {
//     this.studentForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       course: ['', Validators.required],
//       dob: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.studentForm.valid) {
//       const dobYear = new Date(this.studentForm.value.dob).getFullYear();
//       if (dobYear > 2001) {
//         this.note.showMessage('✅ Student added successfully!', 'success');
//         this.studentForm.reset();
//       } else {
//         this.note.showMessage('❌ Not eligible! DOB must be after 2001.', 'error');
//       }
//     } else {
//       this.note.showMessage('❌ Please fill out the form correctly.', 'error');
//     }
//   }
// }
