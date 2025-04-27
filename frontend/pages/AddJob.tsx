import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddJob() {

  const [title, setTitle] = useState("");
  const navigator = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      try {
        const password = localStorage.getItem("password");
        const name = localStorage.getItem("user");

        if (!password || !name) {
          alert("User is not logged in.");
          return;
        }
        const response = await fetch("http://localhost:3000/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title , name ,password}),
        });

        if (response.ok) {
          const newJob = await response.json();
          alert("Job added successfully!");
          setTitle("");
          navigator ('/jobs');
        } else {
          alert("Failed to add job.");
        }
      } catch (error) {
        alert("Error adding job: " + error);
      }
    } else {
      alert("Job title is required.");
    }
  };

  return (
    <div className="add-job-page">
      <h2>Add a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
