import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Course } from '../types/Course'

// Base URL for your API
axios.defaults.baseURL = 'https://localhost:7214/api'

// Generic response handler
const responseBody = <T>(response: AxiosResponse<T>) => response.data

// Abstracted HTTP methods with type safety
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// Courses API
const Courses = {
  list: () => requests.get<Course[]>('/courses'),
  details: (id: string) => requests.get<Course>(`/courses/${id}`),
  create: (course: Course) => requests.post<void>('/courses', course),
  update: (course: Course) => requests.put<void>(`/courses/${course.id}`, course),
  delete: (id: string) => requests.del<void>(`/courses/${id}`),
}


// Combine all endpoints into a single agent
const agent = {
  Courses,
}

export default agent
