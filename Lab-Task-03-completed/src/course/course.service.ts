import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  getAllCourses() {
    return {
      message: 'All courses fetched',
      data: [],
    };
  }

  getCourseById(id: string) {
    return {
      message: 'advance web',
      id: '22-47271-1',
    };
  }

  createCourse(name: string, code: string) {
    return {
      message: 'Course created',
      data: { name, code },
    };
  }
}