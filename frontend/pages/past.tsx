import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Story from "../components/Story";

function Past() {
  return (
    <>
      <Content />
    </>
  );
}


function Content() {
  const [stories, setStories] = useState<StoryType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost:3000/past');
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <Header />
      <main className="content-container">
        {stories && stories.length > 0 ? (
          stories.map((story, index) => (
            <Story key={story._id} {...story} index={index} />
          ))
        ) : (
          <p>No stories available.</p>
        )}
      </main>
    </>
  );
}



export default Past;