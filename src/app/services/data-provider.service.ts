import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { Professor } from '../interfaces/professor';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private apiUrl: string = "https://studentsystem-7ecc6.firebaseio.com"

  constructor( private http: HttpClient) { }

  getStudents() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/students.json`).toPromise().then((response: Object) => {
        let students: Student[] = [];

        for (let [key, value] of Object.entries(response)) {
          students.push(value as Student)
        }

        resolve(students);
      })
    }) 
  }

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/students/${studentId}.json`, ).toPromise()
  }

  addStudent(student: Student) {
    let requestBody = {};
    requestBody[student.id] = student;

    return this.http.post<Student>(`${this.apiUrl}/students.json`, requestBody).toPromise()
  }

  editStudent(student: Student) {
    return this.http.patch<Student>(`${this.apiUrl}/students/${student.id}.json`, student).toPromise()
  }

  getProfessors() {
    return this.http.get<Professor[]>(`${this.apiUrl}/professors.json`).toPromise()
  }

  getCourses() {
    return this.http.get<Professor[]>(`${this.apiUrl}/courses.json`).toPromise()
  }
}
