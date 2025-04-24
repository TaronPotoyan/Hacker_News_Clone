import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";

function Comments() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [author, setAuthor] = useState<any>("");

  useEffect(() => {
    fetch(`http://localhost:3000/stories/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
    setAuthor(localStorage.getItem("user"));
  }, [id]);

  return (
    <>
      <Header />
      {id ? <Main res={data} id={id} author={author} /> : <p>Invalid ID</p>}
      <Footer creating_txt={"Comment"} />
    </>
  );
}

export default Comments;

function Main({ res, id, author }: { res: any; id: string; author: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [visibleReplies, setVisibleReplies] = useState<Record<number, boolean>>({});
  const [replies, setReplies] = useState<Record<number, any[]>>({});

  if (!res) return <p>Loading comments...</p>;

  const handleReplyClick = (index: number) => {
    if (!author) {
      alert("Please log in to reply.");
      return;
    }
    setActiveIndex(index === activeIndex ? null : index);
    setReplyText("");
    if (!replies[index]) {
      fetchReplies(index);
    }
  };

  const fetchReplies = (index: number) => {
    fetch(`http://localhost:3000/get_replays/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReplies((prevReplies) => ({
          ...prevReplies,
          [index]: data.replies,
        }));
      });
  };

  const handleAddReply = (index: number) => {
    fetch(`http://localhost:3000/get_replays/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replyText,
        index,
        author: localStorage.getItem("user"),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchReplies(index);
      });
    setReplyText("");
    setActiveIndex(null);
  };

  const toggleReplies = (index: number) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    if (!replies[index]) {
      fetchReplies(index);
    }
  };

  return (
    <main>
      <h1>Comments for: {res.title}</h1>
      <div className="comments-wrapper">
        {res.comments && res.comments.length > 0 ? (
          res.comments.map((comment: any, index: number) => (
            <div key={index} className="comm" style={{ marginBottom: "1em" }}>
              <h3>Author: {comment.author}</h3>
              <p>
                {comment.text} : {comment.date}
              </p>
              <button
                onClick={() => handleReplyClick(index)}
                disabled={!author}
                title={!author ? "Log in to reply" : ""}
              >
                Add reply
              </button>
              <button onClick={() => toggleReplies(index)}>
                {visibleReplies[index] ? "Hide replies" : "See replies"}
              </button>
              {visibleReplies[index] && (
                <div className="replies" style={{ marginTop: "0.5em", paddingLeft: "1em" }}>
                  {replies[index] && replies[index].length > 0 ? (
                    replies[index].map((reply: any, replyIndex: number) => (
                      <p key={replyIndex}>
                        <strong>{reply.author}</strong>: {reply.text} - {reply.date}
                      </p>
                    ))
                  ) : (
                    <p>No replies yet.</p>
                  )}
                </div>
              )}
              {activeIndex === index && author && (
                <div style={{ marginTop: "0.5em" }}>
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                  />
                  <button onClick={() => handleAddReply(index)}>Submit</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </main>
  );
}
