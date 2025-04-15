import React, { useState } from "react";
import axios from "axios";

const TutorCreateCourse = () => {
  const [courseData, setCourseData] = useState({
    tutor_id: "", // Tutor enters this manually
    title: "",
    description: "",
    resource_links: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    if (e.target.name === "thumbnail") setThumbnail(e.target.files[0]);
    if (e.target.name === "video") setVideo(e.target.files[0]);
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("tutor_id", parseInt(courseData.tutor_id, 10)); // Convert to number
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("resource_links", courseData.resource_links);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (video) formData.append("video", video);

    try {
      const response = await axios.post(
        "http://localhost:5000/courses/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Course Created Successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("❌ Error creating course:", error.response?.data || error);
      alert("Error creating course. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="tutorCreate">
      {/* <h2>Create a New Course</h2> */}
      <form onSubmit={handleSubmit}>

        {/* Tutor ID */}
        <input
          type="number"
          name="tutor_id"
          placeholder="Enter your Tutor ID"
          value={courseData.tutor_id}
          onChange={handleChange}
          required
        />

        {/* Course Title */}
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={courseData.title}
          onChange={handleChange}
          required
        />

        {/* Course Description */}
        <textarea
          name="description"
          placeholder="Course Description"
          value={courseData.description}
          onChange={handleChange}
          required
        />

        {/* Resource Links */}
        <input
          type="text"
          name="resource_links"
          placeholder="External Resource Links (Optional)"
          value={courseData.resource_links}
          onChange={handleChange}
        />

        {/* Upload Thumbnail */}
        <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} required />

        {/* Upload Video */}
        <input type="file" name="video" accept="video/*" onChange={handleFileChange} required />

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default TutorCreateCourse;
