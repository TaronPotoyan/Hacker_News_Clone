import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface FooterProps {
  creating_txt: string;
  author: string;
}



export default function Footer({ creating_txt, author }: FooterProps) {

  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");



  function handlerAsk() {
    
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      alert("Please Log in");
      navigate("/login");
      return;
    }
    const story = {
      author: loggedInUser,
      title: `Ask HN: ${title}`,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(story),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Story created:", data);
        setTitle("");
        setUrl("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  function handlerAddShow() {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      alert("Please Log in");
      navigate("/login");
      return;
    }
    const story = {
      author: loggedInUser,
      title: `Show HN: ${title}`,
      url,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(story),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Story created:", data);
        setTitle("");
        setUrl("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handlePostStory() {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      alert("Please Log in");
      navigate("/login");
      return;
    }

    const story = {
      author: loggedInUser,
      title,
      url,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(story),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Story created:", data);
        setTitle("");
        setUrl("");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handlePostComment() {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      alert("Please Log in to comment.");
      navigate("/login");
      return;
    }

    const comment = {
      author: loggedInUser,
      title,
      text,
    };
    console.log(comment);

    fetch(`http://localhost:3000/stories/comm/${id}/put`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Comment added:", data);
        setTitle("");
        setText("");
      })
      .catch((error) => console.error("Error:", error));
  }

  if (creating_txt === "Story") {
    return (
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Create Your Story</h3>
          <div className="input-group">
            <label>
              Title:
              <input
                className="footer-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              URL:
              <input
                className="footer-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <button className="footer-button" onClick={handlePostStory}>
            POST
          </button>
        </div>
      </footer>
    );
  } else if (creating_txt === "Comment") {
    return (
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Add a Comment</h3>
          <div className="input-group">
            <label>
              Title:
              <input
                className="footer-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Comment:
              <input
                className="footer-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
          </div>
          <button className="footer-button" onClick={handlePostComment}>
            ADD COMMENT
          </button>
        </div>
      </footer>
    );
  } else if (creating_txt === "Show") {
    return (
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Add a Show</h3>
          <div className="input-group">
            <label>
              Title:
              <input
                className="footer-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              URL:
              <input
                className="footer-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>
          </div>
          <button className="footer-button" onClick={handlerAddShow}>
            ADD SHOW
          </button>
        </div>
      </footer>
    )
  } else if (creating_txt === 'ask') {
      return (
        <>
            <footer className="footer">
            <div className="footer-content">
              <h3 className="footer-title">Add a Show</h3>
              <div className="input-group">
                <label>
                  Question:
                  <input
                    className="footer-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>
              <button className="footer-button" onClick={handlerAsk}>
                ADD ASK
              </button>
            </div>
          </footer>
        </>
        )
      }

  return null;
}
