import { Component, OnInit } from '@angular/core';
import { Student, StudentAdd } from '../interfaces/student';
import { Professor } from '../interfaces/professor';
import { Course } from '../interfaces/course';
import { DataProviderService } from '../services/data-provider.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { EditStudentComponent } from '../edit-student/edit-student.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  students: Student[] = [];
  professors: Professor[] = [];
  courses: Course[] = [];

  ref: DynamicDialogRef;

  constructor(
    private dataProvider: DataProviderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.refreshStudents();
    this.refreshProfessors();
    this.refreshCourses();
  }

  editStudent(studentBefore: Student) {
    this.ref = this.dialogService.open(EditStudentComponent, {
      header: 'Add new student',
      width: 'auto',
      data: studentBefore,
      contentStyle: { "height": "auto", "overflow": "visible" }
    });

    this.ref.onClose.subscribe((student: StudentAdd) => {
      if (student) {
        this.dataProvider.editStudent(student, studentBefore)
          .then(() => {
            this.messageService.add({ severity: 'info', summary: 'Student updated', detail: `Student ${student.name} updated.` })
            this.refreshStudents();
          })
          .catch((error) => this.messageService.add({ severity: 'error', summary: 'Cannot update student', detail: error }));
      }
    });
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete student ${student.name}?`,
      accept: () => {
        this.dataProvider.deleteStudent(student).then(() => {
          this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'User deleted' });
          this.refreshStudents();
          this.refreshCourses()
        }).catch((error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot delete student' }))
      }
    });
  }

  private refreshStudents() {
    this.dataProvider.getStudents()
      .then((response: Student[]) => {
        this.students = response
      })
      .catch(error => console.error("Can't get students", error))
  }

  private refreshCourses() {
    this.dataProvider.getCoursesImproved()
    .then((courses: Course[]) => {
      this.courses = courses
    })
    .catch(error => console.error("Can't get courses", error))
  }

  private refreshProfessors() {
    this.dataProvider.getProfessors()
    .then((professors: Professor[]) => this.professors = professors)
    .catch(error => console.error("Can't get professors", error))
  }

  ngOnDestroy() {
    this.ref.close();
  }
}
