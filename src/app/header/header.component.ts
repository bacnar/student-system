import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AddStudentComponent } from '../add-student/add-student.component';
import { Student, StudentAdd } from '../interfaces/student';
import { DataProviderService } from '../services/data-provider.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public dataProviderService: DataProviderService,
    private authService: AuthService) { }

  ngOnInit() {
    this.items = [{
      label: 'Overview',
      routerLink: 'overview',
      items: [{
        label: 'Add new student',
        command: (onclick) => this.show()
      }]
    }];
  }

  logout() {
    this.authService.logout();
  }

  show() {
    this.ref = this.dialogService.open(AddStudentComponent, {
      header: 'Add new student',
      width: 'auto',
      contentStyle: { "height": "auto", "overflow": "visible" }
    });

    this.ref.onClose.subscribe((student: StudentAdd) => {
      if (student) {
        this.dataProviderService.addStudent(student)
          .then(() => this.messageService.add({ severity: 'info', summary: 'Student added', detail: `Student ${student.name} added.` }))
          .catch((error) => this.messageService.add({ severity: 'error', summary: 'Cannot add student', detail: error }));
      }
    });
  }

  ngOnDestroy() {
    this.ref.close();
  }
}
