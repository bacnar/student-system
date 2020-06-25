import { Component, OnInit } from '@angular/core';
import { Course, CourseSelect } from '../interfaces/course';
import { DataProviderService } from '../services/data-provider.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StudentAdd } from '../interfaces/student';
import { IdGeneratorService } from '../services/id-generator.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  courses: CourseSelect[] = [];
  addForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private dataProviderService: DataProviderService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private idGeneratorService: IdGeneratorService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      courses: ['', Validators.required]
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
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    var student: StudentAdd = {
      id: this.idGeneratorService.generateUniqueId().toString(),
      age: this.addForm.controls.age.value,
      name: this.addForm.controls.name.value,
      courses: Array.from(this.addForm.controls.courses.value as Course[], course => course.id) as string[]
    }

    this.ref.close(student);
  }
}
