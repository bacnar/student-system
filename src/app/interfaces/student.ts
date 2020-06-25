import { Course } from './course';

export interface Student {
    id: string,
    age: number,
    name: string,
    courses: Course[]
}

export interface StudentAdd {
    id: string,
    age: number,
    name: string,
    courses: string[]
}