import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorCourses = () => {
  const [courses, setCourses] = useState([]);
  const tutorId = "1"; // Replace this with actual tutor ID from authentication

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/tutor/${tutorId}`);
        setCourses(response.data); // Store courses in state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [tutorId]);

  return (
    <div>
      <h2>Your Created Courses</h2>
      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} width="200" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorCourses;
