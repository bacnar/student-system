import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentAdd } from '../interfaces/student';
import { DataProviderService } from '../services/data-provider.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  private ref: DynamicDialogRef;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private dataProviderService: DataProviderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.items = [{
      label: 'Overview',
      routerLink: 'overview',
      items: [{
        label: 'Add new student',
        command: () => this.show()
      }]
    }];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  show(): void {
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

  ngOnDestroy(): void {
    this.ref.close();
  }
}
