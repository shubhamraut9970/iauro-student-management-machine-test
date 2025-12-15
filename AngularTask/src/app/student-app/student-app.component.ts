import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DailogsComponent } from '../dailogs/dailogs.component';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dob: Date;
  gender: string;
  course: string;
}

export class TouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-student-app',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  templateUrl: './student-app.component.html',
  styleUrl: './student-app.component.scss',
})

export class StudentAppComponent implements OnInit {
  studentForm!: FormGroup;
  studentData = new MatTableDataSource<Student>([]);
  displayedColumns: string[] = [
    'id',
    'name',       
    'email',
    'phone',
    'address',
    'dob',
    'course',
    'gender',
    'actions',
  ];
  studentUpdateId: number | null = null;
  courses: string[] = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
  ];
  availableCourses: string[] = [];
  maxDate: Date = new Date();
  matcher = new TouchedErrorStateMatcher();
  
  private readonly STORAGE_KEY = 'studentData';

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.formValidation();
    this.availableCourses = this.courses;
    this.loadStudentsFromStorage();
  }

  formValidation() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  loadStudentsFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    
    try {
      const saveData = localStorage.getItem(this.STORAGE_KEY);
      if (saveData) {
        const students = JSON.parse(saveData);
        students.forEach((student: Student) => {
          student.dob = new Date(student.dob);
        });
        this.studentData.data = students;
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }

  saveStudentsToStorage(): void {
    if (typeof localStorage === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.studentData.data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-IN');
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.studentUpdateId !== null) {
        const students = this.studentData.data;
        const index = students.findIndex((s) => s.id === this.studentUpdateId);
        if (index !== -1) {
          students[index] = {
            id: this.studentUpdateId,
            ...this.studentForm.value,
          };
          this.studentData.data = [...students];
        }
        this.studentUpdateId = null;
      } else {
        const students = this.studentData.data;
        const newStudent: Student = {
          id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
          ...this.studentForm.value,
        };
        this.studentData.data = [...students, newStudent]; 
      }
      
      this.saveStudentsToStorage();
      this.studentForm.reset();
    }
  }

  updateSelectedStudent(student: Student): void {
    this.studentUpdateId = student.id;
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      address: student.address,
      dob: student.dob,
      gender: student.gender,
      course: student.course,
    });
  }

  deleteSelectedStudent(id: number): void {
    const student = this.studentData.data.find(s => s.id === id);
    if (!student) return;

    const studentName = `${student.firstName} ${student.lastName}`;

    const dialogRef = this.dialog.open(DailogsComponent, {
      width: '400px',
      data: { studentName: studentName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const students = this.studentData.data;
        const index = students.findIndex((s) => s.id === id);
        if (index !== -1) {
          students.splice(index, 1);
          this.studentData.data = [...students];
          
          this.saveStudentsToStorage();
        }
      }
    });
  }

  cancelEdit(): void {
    this.studentUpdateId = null;
    this.studentForm.reset();
  }
}