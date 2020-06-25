import { Course } from './course';

export interface Professor {
    id: string,
    age: number,
    name: string,
    courses: Array<Course>
}
