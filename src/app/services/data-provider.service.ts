import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, StudentAdd } from '../interfaces/student';
import { Professor } from '../interfaces/professor';
import { Course, ImprovedCourse, CourseSelect } from '../interfaces/course';


@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private apiUrl: string = "https://studentsystem-7ecc6.firebaseio.com"

  constructor(private http: HttpClient) { }

  getStudents(): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/students.json`).toPromise().then((response: Object) => {
        this.http.get<Course[]>(`${this.apiUrl}/courses.json`).toPromise()
          .then((courses: Object) => {

            let coursesFiltered = Object.entries(courses).map((keyValueCourses) => keyValueCourses[1]) as Course[];

            let students = response != null ? Object.entries(response).map((keyValueStudent) => keyValueStudent[1]) : []

            students.forEach((student) => {
              student.courses = student.courses.map((course) => coursesFiltered.find((courseFiltered: Course) => courseFiltered.id == course))
            })

            resolve(students as Student[]);
          })
      }).catch((error) => reject(error))
    })
  }

  deleteStudent(student: Student): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/students/${student.id}.json`,).toPromise().then(async () => {

        for (let course of student.courses) {
          await this.deleteStudentsToCourses(course.id, student.id);
        }

        resolve();
      }).catch((error) => reject(error))
    })
  }

  addStudent(student: StudentAdd): Promise<void> {
    return new Promise((resolve, reject) => {

      this.http.put<StudentAdd>(`${this.apiUrl}/students/${student.id}.json`, student).toPromise()
        .then(async () => {

          for (let courseId of student.courses) {
            try {
              await this.addStudentsToCourses(courseId, student.id);
            }
            catch (error) {
              reject(error);
              return;
            }
          }

          resolve();
        }).catch((error) => reject(error))
    })
  }

  editStudent(student: StudentAdd, studentBefore: Student): Promise<void> {
    return new Promise((resolve, reject) => {
      let coursesBefore = studentBefore.courses.map((course: Course) => course.id)
      let coursesNow = student.courses


      this.http.patch<StudentAdd>(`${this.apiUrl}/students/${student.id}.json`, student).toPromise().then(async () => {

        for (let courseId of coursesBefore) {
          try {
            await this.deleteStudentsToCourses(courseId, student.id);
          }
          catch (error) {
            reject(error);
            return;
          }
        }

        for (let courseId of coursesNow) {
          try {
            await this.addStudentsToCourses(courseId, student.id);
          }
          catch (error) {
            reject(error);
            return;
          }
        }

        resolve();
      }).catch((error) => reject(error))
    })
  }

  getProfessors(): Promise<Professor[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Professor[]>(`${this.apiUrl}/professors.json`).toPromise().then((response: Object) => {
        this.http.get<Course[]>(`${this.apiUrl}/courses.json`).toPromise()
          .then((courses: Object) => {

            let coursesFiltered = Object.entries(courses).map((keyValueCourses) => keyValueCourses[1]) as Course[];

            let professors = Object.entries(response).map((keyValueStudent) => keyValueStudent[1]);

            professors.forEach((professor) => {
              professor.courses = professor.courses.map((course) => coursesFiltered.find((courseFiltered: Course) => courseFiltered.id == course))
            })

            resolve(professors as Professor[]);
          })
      }).catch((error) => reject(error))
    })
  }

  getCourses(): Promise<CourseSelect[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Course[]>(`${this.apiUrl}/courses.json`).toPromise().then((response) => {
        let courses: CourseSelect[] = [];

        response.forEach(course => {
          var courseSelect: CourseSelect = {
            label: course.title,
            value: course
          }

          courses.push(courseSelect)
        })

        resolve(courses)
      }).catch((error) => reject(error))
    })
  }

  getCoursesImproved(): Promise<ImprovedCourse[]> {
    return new Promise(async (resolve, reject) => {
      this.http.get<Course[]>(`${this.apiUrl}/courses.json`).toPromise().then(async (response: Object[]) => {

        for (let course of response) {
          var professor: Professor = await this.getProfessor(course['professor_id'])

          delete course['professor_id']
          course["professor"] = professor

          if (course['students'] != undefined) {

            var students = Object.entries(course['students']).map(async (keyValueStudent) => {
              return await this.getStudent(keyValueStudent[1] as string);
            })

            course['students'] = await Promise.all(students);
          } else {
            course['students'] = [];
          }
        }

        resolve(response as ImprovedCourse[]);
      }).catch((error) => reject(error))
    })
  }

  private addStudentsToCourses(courseId: string, studentId: string): Promise<Course> {
    let obj = {}
    obj[studentId] = studentId
    return this.http.patch<Course>(`${this.apiUrl}/courses/${courseId}/students.json`, obj).toPromise()
  }

  private deleteStudentsToCourses(courseId: string, studentId: string): Promise<Course> {
    return this.http.delete<Course>(`${this.apiUrl}/courses/${courseId}/students/${studentId}.json`).toPromise()
  }

  private getProfessor(professorId: string): Promise<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/professors/${professorId}.json`).toPromise()
  }

  private getStudent(studentId: string): Promise<Object> {
    return this.http.get(`${this.apiUrl}/students/${studentId}.json`).toPromise()
  }
}
