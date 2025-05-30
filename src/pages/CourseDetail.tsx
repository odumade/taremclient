import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import type { Course } from '../types/Course';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api.get<Course>(`/courses/${id}`)
      .then(response => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load course", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{course.title}</h2>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Price:</strong> ${course.price}</p>
      <p><strong>Rating:</strong> {course.rating}</p>
      <img src={course.image} alt={course.title} width="300" />
    </div>
  );
};

export default CourseDetail;