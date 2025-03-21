import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";

const StudentHome = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const studentData = JSON.parse(localStorage.getItem("studentData"));
        if (studentData) setStudent(studentData);

        axios.get("http://localhost:5000/courses")
            .then(response => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div>
            <StudentNavbar />
            <div className="home-content">
                {student && <h2>Welcome, {student.firstName} {student.lastName}!</h2>}
                <h3>📚 Available Courses</h3>
                {courses.length > 0 ? (
                    <ul>
                        {courses.map(course => (
                            <li key={course.course_id}>
                                <strong>{course.course_name}</strong> - {course.instructor}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default StudentHome;
