import { Component, OnInit } from '@angular/core';
import { Student } from '../interfaces/student';
import { Professor } from '../interfaces/professor';
import { Course } from '../interfaces/course';
import { DataProviderService } from '../services/data-provider.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  students: Student[];
  professors: Professor[];
  courses: Course[];
  constructor(
    private dataProvider: DataProviderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.refreshStudents();
  }

  editStudent(studentId: number) {

  }

  deleteStudent(studentId: number, studentName: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete student ${studentName}?`,
      accept: () => {
        this.dataProvider.deleteStudent(studentId).then(() => {
          this.messageService.add({severity:'warn', summary:'Deleted', detail:'User deleted'});
        }).catch((error) => this.messageService.add({severity:'error', summary:'Error', detail:'Cannot delete student'}))
      }
  });

  }

  private refreshStudents() {
    this.dataProvider.getStudents()
    .then((response: Student[]) => this.students = response)
    .catch(error => console.error("Can't get students", error))
  }
}
