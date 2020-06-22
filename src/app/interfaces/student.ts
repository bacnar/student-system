import { Course } from './course';

export interface Student {
    id: number,
    age: number,
    name: string,
    courses: Array<Course>
}
