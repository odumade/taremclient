import React, { useState, useLayoutEffect, useEffect, JSX } from 'react'
import * as FaIcons from 'react-icons/fa'
import agent from './services/agent'
import type { Course } from './types/Course'
import Navigation from './components/Navigation'
import { Route, Routes } from 'react-router-dom'
import CourseDetails from './pages/CourseDetail'


function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    agent.Courses.list()
      .then((response) => setCourses(response))
      .finally(() => setLoading(false))
  }, [])

  const showStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.3

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaIcons.FaStar key={i} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FaIcons.FaStarHalf key="half" className="text-yellow-400" />)
    }

    return stars
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">What to Learn Next?</h1>
        <h2 className="text-xl text-gray-600">New Courses picked just for you...</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course: Course, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={course.image}
                alt="course"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                <div className="flex items-center text-sm text-yellow-500 mb-2">
                  <span className="mr-2 text-gray-700">{course.rating}</span>
                  <span className="flex space-x-1">{showStars(course.rating)}</span>
                </div>
                <div className="text-blue-600 font-bold text-md">{`$${course.price}`}</div>
              </div>
            </div>
          ))}
        </div>
      )}
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
