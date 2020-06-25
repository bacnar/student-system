import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataProviderService } from '../services/data-provider.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IdGeneratorService } from '../services/id-generator.service';
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
  studentId: string;

  constructor(
    private dataProviderService: DataProviderService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    let student: Student = this.config.data as Student;
    let selectedCourses: Course[] = student.courses.map((course: Course) => course)
    this.studentId = student.id;

    this.editForm = this.formBuilder.group({
      name: [student.name, Validators.required],
      age: [student.age, Validators.required],
      courses: [selectedCourses, Validators.required]
    });

    this.dataProviderService.getCourses()
      .then((coursesResponse: Course[]) => {
        coursesResponse.forEach(course => {
          var cor: CourseSelect = {
            label: course.title,
            value: course
          }

          this.courses.push(cor)
        })
      })
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
      id: this.studentId,
      age: this.editForm.controls.age.value,
      name: this.editForm.controls.name.value,
      courses: Array.from(this.editForm.controls.courses.value as Course[], course => course.id) as string[]
    }

    this.ref.close(student);
  }

  dismiss() {
    this.ref.close();
  }
}
