import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataProviderService } from '../services/data-provider.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Course, CourseSelect } from '../interfaces/course';
import { StudentAdd, Student } from '../interfaces/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  courses: CourseSelect[] = [];
  editForm: FormGroup;
  submitted: boolean = false;
  private student: Student;

  constructor(
    private dataProviderService: DataProviderService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.student = this.config.data as Student;
    let selectedCourses: Course[] = this.student.courses.map((course: Course) => course)

    this.editForm = this.formBuilder.group({
      courses: [selectedCourses, Validators.required]
    });

    this.dataProviderService.getCourses()
      .then((coursesResponse: CourseSelect[]) => this.courses = coursesResponse)
      .catch((error) => console.error("Can't get courses", error))
  }

  get form() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    var student: StudentAdd = {
      id: this.student.id,
      age: this.student.age,
      name: this.student.name,
      courses: Array.from(this.editForm.controls.courses.value as Course[], course => course.id) as string[]
    }

    this.ref.close(student);
  }

  dismiss() {
    this.ref.close();
  }
}
