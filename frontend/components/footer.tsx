  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";

  interface FooterProps {
    creating_txt: string;
    author: string | null;
  }

  export default function Footer({ creating_txt, author }: FooterProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userAuthor, setUserAuthor] = useState<string | null>(author);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [commentAuthor, setCommentAuthor] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setUserAuthor(loggedInUser);
      }
    }, []);

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
                })
                .catch((error) => { 
                  console.error("Error:", error);
                });
  }
    function handlePostComment() {
      if (!commentAuthor) {
        alert("Please provide your name for the comment.");
        return;
      }

      const comment = { author: commentAuthor, text };

      fetch(`http://localhost:3000/stories/comm/${id}/put`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      })
        .then((res) => res.json())
        .then((data) => console.log("Comment added:", data))
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
                Author:
                <input
                  className="footer-input"
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
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
    }

    return null;
  }
