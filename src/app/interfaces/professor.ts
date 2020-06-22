import { Course } from './course';

export interface Professor {
    id: number,
    age: number,
    name: string,
    courses: Array<Course>
}
