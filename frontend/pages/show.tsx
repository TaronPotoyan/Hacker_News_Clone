import { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Story from '../components/Story.tsx'
import React from "react";


interface StoryProps {
  _id: string;
  title: string;
  author: string;
  content: string;
 
}


export default function Show() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    
    localStorage.setItem('token' , "true");
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setLoggedInUser(userFromLocalStorage);
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer creating_txt="Show" author={loggedInUser || "Unknown"} />
    </>
  );
}

function Main() {
  const [stories, setStories] = useState<StoryProps[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/show/")
      .then((response) => response.json())
      .then((data) => { setStories(data) , console.log(data); })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main>
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <Story key={story._id} {...story} index={index} />
        ))
      ) : (
        stories.length === 0 ? <strong>No Shows</strong> : <p>Loading ...</p>
      )}
    </main>
  );
}


