import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Course } from '../types/Course'
import agent from '../services/agent' 

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    agent.Courses.details(id)
      .then((data) => {
        setCourse(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load course', err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>
  if (!course) return <p className="p-4 text-red-600">Course not found.</p>

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <p className="mb-2">
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <p className="mb-2">
        <strong>Price:</strong> ${course.price}
      </p>
      <p className="mb-4">
        <strong>Rating:</strong> {course.rating}
      </p>
      <img
        src={course.image}
        alt={course.title}
        className="rounded shadow w-full max-w-md"
      />
    </div>
  )
}

export default CourseDetail
