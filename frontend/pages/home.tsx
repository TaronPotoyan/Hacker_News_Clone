import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, []);

  return (
    <>
      <Header loggedInUser={loggedInUser} />
      <Main />
      <Footer creating_txt={"Story"} author={loggedInUser || "Unknown"} />
    </>
  );
}

function Main() {
  const [stories, setStories] = useState<StoryProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/stories/")
      .then((response) => response.json())
      .then((data) => {
        setStories(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <main>
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <Story key={story._id} {...story} index={index} />
        ))
      ) : (
        <p>Loading stories...</p>
      )}
    </main>
  );
}

interface Comment {
  author: string;
  text: string;
}

interface StoryProps {
  _id: string;
  author: string;
  title: string;
  url: string;
  comments: Comment[];
  date: string;
}

function Story({
  _id,
  author,
  title,
  url,
  date,
  index,
}: StoryProps & { index: number }) {
  return (
    <div className="Story">
      <h3>
        <a href={url}>
          {index + 1}: {title}
        </a>
      </h3>
      <b>{author}</b>
      <h3>{date}</h3>
      <Link to={`/story/comm/${_id}`}>Comments</Link>
    </div>
  );
}
