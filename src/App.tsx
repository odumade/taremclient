import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from './services/api'
import type { Course } from './types/Course'
import CourseDetails from './pages/CourseDetail'
import Navigation from './components/Navigation'


function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Course[]>('/courses')
      .then((response) => {
        setCourses(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching courses:', error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="p-4 text-gray-500">Loading courses...</p>

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Course List</h1>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="bg-white p-4 rounded-lg shadow hover:bg-blue-50 transition"
          >
            <Link
              to={`/courses/${course.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {course.title}
            </Link>
            <p className="text-sm text-gray-700">
              ${course.price} – Instructor: {course.instructor}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
    </>
  )
}

export default App
